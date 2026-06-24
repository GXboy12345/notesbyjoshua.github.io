# Supabase Edge Functions

## `feedback-to-linear`

Turns site feedback into Linear tickets. A Database Webhook fires on every
`INSERT` into `public.feedback`; the function opens a Linear issue for every
category **except `praise`**, then writes the ticket URL back onto the feedback
row (shown in `/admin/feedback/`).

```
FeedbackForm → feedback table → DB Webhook → this function → Linear issue
```

---

### 1. Apply the schema change

The feedback table gained `category`, `page_url`, `page_title`, and
`linear_issue_url` columns. Re-run `supabase/schema.sql` in the Supabase
dashboard (SQL Editor → New query → paste → Run). It's idempotent.

### 2. Create the labels in Linear

In your Linear team, create these labels (Settings → Team → Labels). The
function matches them **by name** (case-insensitive), so the names must match
exactly — no IDs to copy:

| Label            | Used for                          |
| ---------------- | --------------------------------- |
| `Website feedback` | every ticket this creates (umbrella) |
| `Note to add`    | category "A note or topic to add" |
| `Correction`     | category "A correction / fix"     |
| `Bug`            | category "A bug with the site"    |
| `Question`       | category "A question"             |

A label that doesn't exist is simply skipped (the ticket is still created), so
you can start with just `Website feedback` and add the rest later. `Bug`
tickets are also created at **High** priority.

### 3. Get your Linear API key + team ID

- **API key:** Linear → Settings → Security & access → **Personal API keys** →
  *New key*. Copy it (starts with `lin_api_...`).
- **Team ID:** the function needs the team's UUID (not the short key like `ENG`).
  Run this in Linear's API explorer (https://studio.apollographql.com, endpoint
  `https://api.linear.app/graphql`, header `Authorization: <your key>`), or with curl:

  ```bash
  curl -s https://api.linear.app/graphql \
    -H "Authorization: <YOUR_LINEAR_API_KEY>" \
    -H "Content-Type: application/json" \
    -d '{"query":"{ teams { nodes { id name } } }"}'
  ```

  Use the `id` (a UUID) of the team you want tickets in.

### 4. Pick a webhook secret

Any long random string — it just has to match between the webhook and the
function. Generate one:

```bash
openssl rand -hex 24
```

### 5. Deploy the function

You don't have the Supabase CLI yet. Either:

**Option A — CLI (recommended):**

```bash
brew install supabase/tap/supabase
supabase login
supabase link --project-ref geqwjrxdbalaviusteeo     # this project
supabase secrets set \
  LINEAR_API_KEY=lin_api_xxx \
  LINEAR_TEAM_ID=<team-uuid> \
  WEBHOOK_SECRET=<your-secret>
supabase functions deploy feedback-to-linear --no-verify-jwt
```

`--no-verify-jwt` is required: the DB webhook calls the function with the shared
secret header, not a user JWT. (Authentication is still enforced — the function
rejects any request without the correct `x-webhook-secret`.)

**Option B — Dashboard:** Edge Functions → *Deploy a new function* → name it
`feedback-to-linear` → paste the contents of `feedback-to-linear/index.ts`. Then
add the three secrets under Edge Functions → *Manage secrets*. Disable "Verify
JWT" for this function.

### 6. Create the Database Webhook

Supabase dashboard → **Database → Webhooks → Create a new hook**:

- **Table:** `public.feedback`
- **Events:** `Insert`
- **Type:** Supabase Edge Functions → `feedback-to-linear`
  (or HTTP Request `POST` to `https://geqwjrxdbalaviusteeo.functions.supabase.co/feedback-to-linear`)
- **HTTP Headers:** add `x-webhook-secret` = `<your-secret>` (same as step 4)

### 7. Test

Submit feedback at `/feedback/` (try a non-praise category). Within a few
seconds a ticket should appear in Linear, and the submission in
`/admin/feedback/` should show a "View Linear ticket →" link. If nothing
happens, check **Edge Functions → Logs** for the function and the webhook's
delivery log.

---

### Local development

```bash
supabase functions serve feedback-to-linear --no-verify-jwt --env-file ./supabase/.env.local
```

with a `supabase/.env.local` holding `LINEAR_API_KEY`, `LINEAR_TEAM_ID`,
`WEBHOOK_SECRET` (git-ignored — never commit real keys).
