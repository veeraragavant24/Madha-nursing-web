-- ============================================================
-- Madha College of Nursing — News & Events admin schema
-- Run this in the Supabase SQL Editor (or via supabase db push).
--
-- What this creates:
--   • news_events  — events/news managed by admins (public reads published only)
--   • admin_users  — which authenticated Supabase users may manage events
--   • storage bucket "news-events" — event images (public read, admin write)
--   • Row Level Security + policies (RLS stays ON)
--   • Seed data: the existing hardcoded News & Events records
--
-- IMPORTANT: After running this, add your admin account:
--
--   INSERT INTO public.admin_users (user_id, role)
--   VALUES ('<REPLACE_WITH_ADMIN_USER_UUID>', 'admin');
--
-- The user UUID comes from Authentication → Users in the Supabase dashboard.
-- ============================================================

create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- news_events
-- ------------------------------------------------------------
create table if not exists public.news_events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  category    text,
  event_date  date not null,
  location    text,
  image_url   text,
  published   boolean not null default true,
  featured    boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists news_events_event_date_idx on public.news_events (event_date);
create index if not exists news_events_published_date_idx on public.news_events (published, event_date);

-- ------------------------------------------------------------
-- admin_users
-- ------------------------------------------------------------
create table if not exists public.admin_users (
  id      uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  role    text not null default 'admin' check (role = 'admin')
);

-- ------------------------------------------------------------
-- updated_at trigger
-- ------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_news_events_updated_at on public.news_events;
create trigger trg_news_events_updated_at
  before update on public.news_events
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------
alter table public.news_events enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "Public can read published news_events" on public.news_events;
create policy "Public can read published news_events"
  on public.news_events
  for select
  using (published = true);

-- Admins manage all rows (including drafts, expired, unpublished).
drop policy if exists "Admins manage news_events" on public.news_events;
create policy "Admins manage news_events"
  on public.news_events
  for all
  using (
    exists (
      select 1 from public.admin_users au
      where au.user_id = auth.uid() and au.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.admin_users au
      where au.user_id = auth.uid() and au.role = 'admin'
    )
  );

-- An admin can read their own admin_users row (used to authorize the dashboard).
drop policy if exists "Admins can read own role" on public.admin_users;
create policy "Admins can read own role"
  on public.admin_users
  for select
  using (auth.uid() = user_id);

-- ------------------------------------------------------------
-- Storage bucket + policies
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('news-events', 'news-events', true)
on conflict (id) do nothing;

-- Public may view event images.
drop policy if exists "Public read news-events bucket" on storage.objects;
create policy "Public read news-events bucket"
  on storage.objects
  for select
  using (bucket_id = 'news-events');

-- Only admins may upload / replace / delete images in the bucket.
drop policy if exists "Admins insert news-events bucket" on storage.objects;
create policy "Admins insert news-events bucket"
  on storage.objects
  for insert
  with check (
    bucket_id = 'news-events'
    and exists (
      select 1 from public.admin_users au
      where au.user_id = auth.uid() and au.role = 'admin'
    )
  );

drop policy if exists "Admins update news-events bucket" on storage.objects;
create policy "Admins update news-events bucket"
  on storage.objects
  for update
  using (
    bucket_id = 'news-events'
    and exists (
      select 1 from public.admin_users au
      where au.user_id = auth.uid() and au.role = 'admin'
    )
  );

drop policy if exists "Admins delete news-events bucket" on storage.objects;
create policy "Admins delete news-events bucket"
  on storage.objects
  for delete
  using (
    bucket_id = 'news-events'
    and exists (
      select 1 from public.admin_users au
      where au.user_id = auth.uid() and au.role = 'admin'
    )
  );

-- ------------------------------------------------------------
-- Seed: migrate the existing hardcoded News & Events content.
-- Skips seeding if rows already exist.
-- ------------------------------------------------------------
do $$
begin
  if not exists (select 1 from public.news_events) then
    insert into public.news_events (title, description, category, event_date, location, image_url, published, featured) values
      (
        'National Conference on Nursing Education',
        'A day of talks and workshops on innovations in nursing education and clinical practice.',
        'Conference',
        '2026-09-12',
        'Madha College Auditorium',
        '/campus/madaha-nursing-college-9.webp',
        true,
        true
      ),
      (
        'Annual Cultural Fest',
        'An evening of music, dance, and talent showcases presented by students of the college.',
        'Campus Event',
        '2026-09-26',
        'College Campus Grounds',
        '/campus/madaha-nursing-college-9.webp',
        true,
        false
      ),
      (
        'Health Awareness Camp',
        'Students and faculty offer health screenings and awareness sessions for the local community.',
        'Community',
        '2026-10-10',
        'Kundrathur Community Hall',
        '/campus/madaha-nursing-college-9.webp',
        true,
        false
      );
  end if;
end
$$;
