-- Origin Step — Supabase Migration 0002
-- Shared PostgreSQL trigger functions and security helper functions.
-- These functions are referenced by later migrations — this file must run first.

-- ─── set_updated_at ───────────────────────────────────────────────────────────
-- Automatically stamps the updated_at column on every row modification.
-- Attach to any table with an updated_at column using:
--   create trigger set_updated_at before update on <table>
--   for each row execute function public.set_updated_at();

create or replace function public.set_updated_at()
  returns trigger
  language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ─── is_admin ─────────────────────────────────────────────────────────────────
-- Returns true if the currently authenticated user has the 'admin' role.
--
-- Marked security definer so it executes with the function owner's privileges,
-- bypassing RLS when it reads public.users. This prevents the infinite recursion
-- that would occur if admin-check policies on public.users triggered themselves.

create or replace function public.is_admin()
  returns boolean
  stable
  security definer
  set search_path = public
  language plpgsql
as $$
begin
  return exists (
    select 1
    from public.users
    where id = auth.uid()
      and role = 'admin'
  );
end;
$$;

-- ─── handle_new_auth_user ─────────────────────────────────────────────────────
-- Inserts a corresponding public.users row whenever a new auth.users record is created.
-- Reads the display name from sign-up metadata (raw_user_meta_data->>'full_name') if provided.
--
-- The trigger that invokes this function is attached to auth.users in migration 0003,
-- after public.users exists.

create or replace function public.handle_new_auth_user()
  returns trigger
  language plpgsql
  security definer
  set search_path = public
as $$
begin
  insert into public.users (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email
  );
  return new;
end;
$$;
