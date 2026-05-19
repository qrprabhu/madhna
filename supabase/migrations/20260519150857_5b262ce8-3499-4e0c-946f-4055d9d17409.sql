
-- Roles
create type public.app_role as enum ('admin','user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique(user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.user_roles where user_id=_user_id and role=_role)
$$;

create policy "users view own roles" on public.user_roles for select to authenticated using (auth.uid()=user_id);
create policy "admins view all roles" on public.user_roles for select to authenticated using (public.has_role(auth.uid(),'admin'));

-- Petitions
create type public.petition_status as enum ('pending','ongoing','resolved');
create type public.petition_priority as enum ('low','medium','high','urgent');

create table public.petitions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  area text not null,
  address text,
  category text not null,
  description text not null,
  image_url text,
  status petition_status not null default 'pending',
  priority petition_priority not null default 'medium',
  created_at timestamptz not null default now(),
  resolved_image text,
  resolution_note text,
  resolved_at timestamptz
);
alter table public.petitions enable row level security;

-- Anyone can submit; anyone can read (public transparency)
create policy "anyone can insert petitions" on public.petitions for insert to anon, authenticated with check (true);
create policy "anyone can read petitions" on public.petitions for select to anon, authenticated using (true);
create policy "admins update petitions" on public.petitions for update to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admins delete petitions" on public.petitions for delete to authenticated using (public.has_role(auth.uid(),'admin'));

create index on public.petitions(status);
create index on public.petitions(created_at desc);

-- Storage bucket for petition images
insert into storage.buckets (id,name,public) values ('petitions','petitions',true);

create policy "public read petitions bucket" on storage.objects for select using (bucket_id='petitions');
create policy "anyone upload petition image" on storage.objects for insert with check (bucket_id='petitions');
create policy "admins update petition images" on storage.objects for update to authenticated using (bucket_id='petitions' and public.has_role(auth.uid(),'admin'));
create policy "admins delete petition images" on storage.objects for delete to authenticated using (bucket_id='petitions' and public.has_role(auth.uid(),'admin'));
