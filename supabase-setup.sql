-- Run this in Supabase Dashboard → SQL Editor

create table if not exists purchases (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  course_id text not null,
  payment_id text not null,
  order_id text not null,
  purchased_at timestamptz not null default now(),
  unique(user_email, course_id)
);

-- Row Level Security — only service_role (our server) can read/write
alter table purchases enable row level security;

-- No public access — all reads/writes go through our API with service key
create policy "service role only" on purchases
  using (false);
