import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// These are PUBLIC values (safe to ship to the browser): the anon key only
// grants access allowed by Row-Level Security policies, and it already appears
// in the client bundle on every page load. Env vars override the committed
// defaults, so any host works without extra configuration.
// `||` (not `??`) so an empty-string env var also falls back to the default.
const url = import.meta.env.PUBLIC_SUPABASE_URL || 'https://geqwjrxdbalaviusteeo.supabase.co';
const anonKey =
	import.meta.env.PUBLIC_SUPABASE_ANON_KEY ||
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlcXdqcnhkYmFsYXZpdXN0ZWVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMzY5MzYsImV4cCI6MjA5NzgxMjkzNn0.YGgu5YWMWFweq92xPpiA1hwe4dcaeh0JdVl4fgDOWO4';

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
	const profile = await getProfile();
	return profile ? profile.role : null;
}

export interface Profile {
	role: 'visitor' | 'admin';
	display_name: string | null;
	email: string | null;
}

/** The current user's profile row, or null if signed out. */
export async function getProfile(): Promise<Profile | null> {
	const sb = getSupabase();
	if (!sb) return null;
	const { data: { user } } = await sb.auth.getUser();
	if (!user) return null;
	const { data } = await sb
		.from('profiles')
		.select('role, display_name, email')
		.eq('id', user.id)
		.single();
	return {
		role: (data?.role as 'visitor' | 'admin') ?? 'visitor',
		display_name: data?.display_name ?? null,
		email: data?.email ?? user.email ?? null,
	};
}
