-- Landing page signups: founders + candidates
-- Run in Supabase SQL Editor or via `supabase db push` if you use the CLI.

create table if not exists public.founders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  startup_name text not null,
  description text,
  is_stealth boolean not null default false,
  hiring_count text not null
);

create table if not exists public.candidates (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  background text not null,
  snack_answer text not null,
  mission_interest text not null
);

-- RLS: no public reads; inserts allowed for anon JWT (browser/server using anon key).
-- If you use SUPABASE_SERVICE_ROLE_KEY in API routes only, RLS is bypassed for that client;
-- these policies still protect against direct anon SELECT.

alter table public.founders enable row level security;
alter table public.candidates enable row level security;

drop policy if exists "founders_insert_anon" on public.founders;
drop policy if exists "candidates_insert_anon" on public.candidates;

create policy "founders_insert_anon"
  on public.founders
  for insert
  to anon
  with check (true);

create policy "candidates_insert_anon"
  on public.candidates
  for insert
  to anon
  with check (true);

-- Optional: allow authenticated service role / dashboard reads via Supabase UI;
-- authenticated users are not used by this landing page.

comment on table public.founders is 'Shosu landing — founder signup form';
comment on table public.candidates is 'Shosu landing — candidate signup form';
