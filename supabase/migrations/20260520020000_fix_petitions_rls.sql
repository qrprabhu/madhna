-- Fix: "new row violates row-level security policy for table petitions"
-- Run in Supabase SQL Editor (project hcksvemoqekivxuwwowu)

alter table public.petitions enable row level security;

drop policy if exists "anyone can insert petitions" on public.petitions;
drop policy if exists "anyone can read petitions" on public.petitions;
drop policy if exists "admins update petitions" on public.petitions;
drop policy if exists "admins delete petitions" on public.petitions;

create policy "anyone can insert petitions"
  on public.petitions for insert to anon, authenticated
  with check (true);

create policy "anyone can read petitions"
  on public.petitions for select to anon, authenticated
  using (true);

-- Requires has_role() from user_roles migration; skip update/delete if not set up yet
create policy "admins update petitions"
  on public.petitions for update to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "admins delete petitions"
  on public.petitions for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));
