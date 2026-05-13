-- Run in Supabase SQL Editor (Dashboard → SQL).

create extension if not exists "pgcrypto";

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  language text not null,
  full_name text,
  form_data jsonb not null default '{}'::jsonb,
  attachment_path text
);

create index if not exists submissions_created_at_idx on public.submissions (created_at desc);
create index if not exists submissions_language_idx on public.submissions (language);

alter table public.submissions enable row level security;

-- Rows are inserted only via server code using the service role key (bypasses RLS).
-- Reads: only service_role on the server after admin session check (no authenticated SELECT).
drop policy if exists "submissions_deny_anon" on public.submissions;
drop policy if exists "submissions_deny_authenticated" on public.submissions;

create policy "submissions_deny_anon"
  on public.submissions
  for all
  to anon
  using (false)
  with check (false);

create policy "submissions_deny_authenticated"
  on public.submissions
  for all
  to authenticated
  using (false)
  with check (false);

insert into storage.buckets (id, name, public)
values ('form-attachments', 'form-attachments', false)
on conflict (id) do nothing;

-- Attachments: upload/read only via service_role (signed URLs created server-side).
