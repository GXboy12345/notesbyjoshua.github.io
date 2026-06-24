-- Profile-picture storage for Notes by Joshua.
--
-- Run this AFTER schema.sql, and run it ON ITS OWN (the Supabase SQL editor runs
-- a script as a single transaction, so keeping this separate means a storage
-- permission error can't roll back the main schema).
--
-- If the `create policy ... on storage.objects` statements error with
-- "must be owner of table objects", use the Dashboard instead:
--   1. Storage → New bucket → name "avatars", toggle **Public**, Create.
--   2. Storage → Policies → (on objects) add policies matching the four below
--      — or, simplest, one INSERT/UPDATE/DELETE policy for role `authenticated`
--      with definition:  bucket_id = 'avatars'.
-- The bucket alone (public) is enough for images to display; the policies are
-- what let signed-in users upload.

-- Public bucket where each user manages files under a folder named after their
-- own user id (e.g. avatars/<uid>/avatar.png).
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do update set public = true;

-- Public read (the bucket is public, but an explicit select policy is harmless).
drop policy if exists "avatars public read" on storage.objects;
create policy "avatars public read" on storage.objects
  for select using (bucket_id = 'avatars');

-- A signed-in user may write/replace/delete only files in their own folder.
drop policy if exists "avatars write own" on storage.objects;
create policy "avatars write own" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "avatars update own" on storage.objects;
create policy "avatars update own" on storage.objects
  for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "avatars delete own" on storage.objects;
create policy "avatars delete own" on storage.objects
  for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
