import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// These are PUBLIC values (safe to ship to the browser): the anon key only
// grants access allowed by Row-Level Security policies. They are inlined at
// build time from environment variables (see .env.example).
const url = import.meta.env.PUBLIC_SUPABASE_URL;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

/** Returns the browser Supabase client, or null if env vars aren't configured. */
export function getSupabase(): SupabaseClient | null {
	if (!url || !anonKey) {
		console.warn('Supabase env vars missing; auth features disabled.');
		return null;
	}
	if (!client) {
		client = createClient(url, anonKey, {
			auth: { persistSession: true, autoRefreshToken: true },
		});
	}
	return client;
}

/** The current user's role ('visitor' | 'admin'), or null if signed out. */
export async function getRole(): Promise<'visitor' | 'admin' | null> {
	const sb = getSupabase();
	if (!sb) return null;
	const { data: { user } } = await sb.auth.getUser();
	if (!user) return null;
	const { data } = await sb.from('profiles').select('role').eq('id', user.id).single();
	return (data?.role as 'visitor' | 'admin') ?? 'visitor';
}
