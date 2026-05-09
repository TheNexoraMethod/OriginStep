-- Origin Step — Supabase Migration 0008
-- Creates the saved_items table for the Journey (bookmarking) feature.
--
-- Polymorphic design: item_type + item_id avoids three separate junction tables.
-- item_id has no foreign key constraint — the application resolves the actual
-- record based on item_type at query time. The unique constraint on
-- (user_id, item_type, item_id) prevents duplicate saves.

create table public.saved_items (
  id         uuid                   primary key default gen_random_uuid(),
  user_id    uuid                   not null references public.users (id) on delete cascade,
  item_type  public.saved_item_type not null,
  item_id    uuid                   not null,
  created_at timestamptz            not null default now(),
  unique (user_id, item_type, item_id)
);

create index saved_items_user_id_idx   on public.saved_items (user_id);
create index saved_items_user_type_idx on public.saved_items (user_id, item_type);

alter table public.saved_items enable row level security;

-- Users can read their own saved items.
create policy "saved_items: self select"
  on public.saved_items for select
  using (auth.uid() = user_id);

-- Users can save new items. The unique constraint prevents duplicate entries.
create policy "saved_items: self insert"
  on public.saved_items for insert
  with check (auth.uid() = user_id);

-- Users can remove their own saved items.
create policy "saved_items: self delete"
  on public.saved_items for delete
  using (auth.uid() = user_id);
