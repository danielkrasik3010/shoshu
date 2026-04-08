-- v2: extend founders table with new fields; add linkedin_url to candidates.
-- Run in Supabase SQL Editor.

-- ── Founders ───────────────────────────────────────────────────
alter table public.founders
  add column if not exists linkedin_url text,
  add column if not exists company_linkedin_url text,
  add column if not exists company_website text,
  add column if not exists team_size text,
  add column if not exists funds_raised text,
  add column if not exists job_title text,
  add column if not exists office_location text,
  add column if not exists work_policy text;

-- hiring_count was created NOT NULL in v1 but is no longer collected by the form.
-- Make it nullable so existing rows are preserved and new inserts don't fail.
alter table public.founders alter column hiring_count drop not null;

-- ── Candidates ─────────────────────────────────────────────────
alter table public.candidates
  add column if not exists linkedin_url text;

-- Comments
comment on column public.founders.linkedin_url         is 'Founder personal LinkedIn';
comment on column public.founders.company_linkedin_url is 'Company LinkedIn page (optional)';
comment on column public.founders.company_website      is 'Company website (optional)';
comment on column public.founders.team_size            is 'Current headcount band';
comment on column public.founders.funds_raised         is 'Funding status / amount raised';
comment on column public.founders.job_title            is 'Role they are hiring for';
comment on column public.founders.office_location      is 'Office city / location';
comment on column public.founders.work_policy          is 'hybrid | onsite | remote';
comment on column public.candidates.linkedin_url       is 'Candidate LinkedIn profile';
