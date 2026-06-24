// Supabase Edge Function: feedback-to-linear
// -----------------------------------------------------------------------------
// Triggered by a Supabase Database Webhook on INSERT into public.feedback.
// For every submission EXCEPT category "praise", it opens a Linear issue, then
// writes the issue URL back onto the feedback row so the admin viewer can link
// to it.
//
// Runs on Deno. Secrets (set with `supabase secrets set` or in the dashboard):
//   LINEAR_API_KEY  - Linear personal API key (Settings > Security & access)
//   LINEAR_TEAM_ID  - the Linear team UUID that tickets land in
//   WEBHOOK_SECRET  - shared secret; the webhook must send it as x-webhook-secret
// Auto-injected by Supabase (no need to set):
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
//
// See ../README.md for full setup steps.

const LINEAR_API = "https://api.linear.app/graphql";

// category -> the Linear label name to attach. "praise" is intentionally absent
// (those never become tickets). Create these labels in your Linear team; the
// function resolves them to IDs by name at runtime, so no IDs are hardcoded.
const CATEGORY_LABEL: Record<string, string> = {
  "note-to-add": "Note to add",
  "correction": "Correction",
  "bug": "Bug",
  "question": "Question",
};
// Applied to every ticket this function creates, on top of the category label.
const COMMON_LABEL = "Website feedback";
// Linear priority: 0 none, 1 urgent, 2 high, 3 normal, 4 low.
const CATEGORY_PRIORITY: Record<string, number> = { bug: 2 };

const SITE = "https://notesbyjoshua.github.io";

async function linear(query: string, variables: Record<string, unknown>) {
  const res = await fetch(LINEAR_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Personal API keys go in Authorization directly (no "Bearer" prefix).
      Authorization: Deno.env.get("LINEAR_API_KEY") ?? "",
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

// Map category + common label names to Linear label IDs for this team.
async function resolveLabelIds(teamId: string, names: string[]): Promise<string[]> {
  const data = await linear(
    `query Labels($id: String!) { team(id: $id) { labels(first: 250) { nodes { id name } } } }`,
    { id: teamId },
  );
  const nodes: { id: string; name: string }[] = data?.team?.labels?.nodes ?? [];
  const wanted = names.map((n) => n.toLowerCase());
  return nodes.filter((n) => wanted.includes(n.name.toLowerCase())).map((n) => n.id);
}

// Look up the submitter's email/display name from profiles (service role).
async function lookupProfile(userId: string): Promise<{ email?: string; display_name?: string }> {
  const base = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const res = await fetch(
    `${base}/rest/v1/profiles?id=eq.${userId}&select=email,display_name`,
    { headers: { apikey: key, Authorization: `Bearer ${key}` } },
  );
  const rows = await res.json().catch(() => []);
  return Array.isArray(rows) && rows[0] ? rows[0] : {};
}

async function writeBackIssueUrl(feedbackId: string, url: string) {
  const base = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  await fetch(`${base}/rest/v1/feedback?id=eq.${feedbackId}`, {
    method: "PATCH",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ linear_issue_url: url }),
  });
}

Deno.serve(async (req) => {
  // 1. Authenticate the webhook with a shared secret.
  if (req.headers.get("x-webhook-secret") !== Deno.env.get("WEBHOOK_SECRET")) {
    return new Response("forbidden", { status: 401 });
  }

  let record: Record<string, any>;
  try {
    const payload = await req.json();
    record = payload.record; // Supabase DB webhook shape: { type, table, record, ... }
  } catch {
    return new Response("bad request", { status: 400 });
  }
  if (!record?.id) return new Response("no record", { status: 400 });

  // 2. Praise (and unknown categories) never become tickets.
  const category: string = record.category ?? "";
  if (!CATEGORY_LABEL[category]) {
    return new Response(JSON.stringify({ skipped: true, category }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const teamId = Deno.env.get("LINEAR_TEAM_ID") ?? "";

  try {
    // 3. Gather context for the ticket body.
    const profile = record.user_id ? await lookupProfile(record.user_id) : {};
    const submitter = record.name || profile.display_name || profile.email || "Anonymous";
    const firstLine = String(record.message).split("\n")[0].slice(0, 80).trim();
    const title = `[${CATEGORY_LABEL[category]}] ${firstLine || "Feedback"}`;

    const lines = [
      record.message,
      "",
      "---",
      `**Category:** ${CATEGORY_LABEL[category]}`,
      `**From:** ${submitter}${profile.email ? ` (${profile.email})` : ""}`,
    ];
    if (record.page_url) {
      const noteUrl = `${SITE}${record.page_url}`;
      lines.push(`**Note:** [${record.page_title || record.page_url}](${noteUrl})`);
    }
    lines.push(`**Submitted:** ${record.created_at ?? ""}`);
    lines.push(`_Via the site feedback form. Admin view: ${SITE}/admin/feedback/_`);
    const description = lines.join("\n");

    // 4. Resolve labels and create the issue.
    const labelIds = await resolveLabelIds(teamId, [CATEGORY_LABEL[category], COMMON_LABEL])
      .catch(() => [] as string[]);

    const input: Record<string, unknown> = { teamId, title, description };
    if (labelIds.length) input.labelIds = labelIds;
    if (CATEGORY_PRIORITY[category]) input.priority = CATEGORY_PRIORITY[category];

    const data = await linear(
      `mutation Create($input: IssueCreateInput!) {
         issueCreate(input: $input) { success issue { identifier url } }
       }`,
      { input },
    );

    const issue = data?.issueCreate?.issue;
    if (!data?.issueCreate?.success || !issue) {
      throw new Error("issueCreate returned no issue");
    }

    // 5. Record the ticket URL back on the feedback row (best effort).
    await writeBackIssueUrl(record.id, issue.url).catch((e) =>
      console.error("[feedback-to-linear] write-back failed:", e),
    );

    return new Response(JSON.stringify({ created: issue.identifier, url: issue.url }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[feedback-to-linear] failed:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
