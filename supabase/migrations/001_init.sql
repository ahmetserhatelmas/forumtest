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
-- Dashboard users (Supabase Auth) can read:
create policy "submissions_select_authenticated"
  on public.submissions
  for select
  to authenticated
  using (true);

insert into storage.buckets (id, name, public)
values ('form-attachments', 'form-attachments', false)
on conflict (id) do nothing;

-- Signed-in admins may download attachments:
create policy "form_attachments_select_authenticated"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'form-attachments');
