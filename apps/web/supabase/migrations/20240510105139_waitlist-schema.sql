create table if not exists public.waitlist (
    id serial primary key,
    email text not null unique,
    approved boolean not null default false,
    created_at timestamp not null default now()
);

revoke all on table public.waitlist from public, service_role;

grant select, insert, delete on table public.waitlist to service_role;

-- RLS
alter table public.waitlist enable row level security;