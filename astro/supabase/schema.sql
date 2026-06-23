-- Notes by Joshua — auth foundation schema.
-- Run this in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Safe to re-run (idempotent).

-- One profile row per auth user, holding their role.
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text,
  role       text not null default 'visitor' check (role in ('visitor', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Is the current request from an admin? SECURITY DEFINER reads the table
-- without triggering RLS recursion.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Read: a user sees their own profile; admins see everyone's.
drop policy if exists "read own or admin" on public.profiles;
create policy "read own or admin" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

-- Update: a user may edit their own profile row.
drop policy if exists "update own profile" on public.profiles;
create policy "update own profile" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Guard: only admins may change the `role` column (blocks self-promotion).
create or replace function public.prevent_role_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role and not public.is_admin() then
    raise exception 'only admins can change roles';
  end if;
  return new;
end;
$$;

drop trigger if exists guard_role on public.profiles;
create trigger guard_role
  before update on public.profiles
  for each row execute function public.prevent_role_change();

-- Auto-create a profile when someone signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- To make yourself admin after signing up, run (with your email):
--   update public.profiles set role = 'admin' where email = 'you@example.com';
