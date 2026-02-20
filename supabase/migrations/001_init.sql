create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('farmer','buyer','transporter','storage_provider','admin')),
  language text not null default 'en' check (language in ('en','hi','te')),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.farmer_profiles (
  user_id uuid primary key references public.users(id) on delete cascade,
  land_size numeric,
  soil_type text,
  location_lat numeric,
  location_lng numeric,
  budget numeric,
  previous_crops jsonb,
  current_crop boolean default false
);

create table if not exists public.buyer_profiles (
  user_id uuid primary key references public.users(id) on delete cascade,
  business_name text,
  gst_number text,
  location_lat numeric,
  location_lng numeric
);

create table if not exists public.crops (
  id uuid primary key default gen_random_uuid(),
  farmer_id uuid not null references public.users(id) on delete cascade,
  crop_name text not null,
  sowing_date date,
  growth_stage text,
  expected_yield numeric,
  health_score numeric,
  harvest_date date
);

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  crop_id uuid not null references public.crops(id) on delete cascade,
  quantity numeric not null,
  price numeric not null,
  video_url text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  buyer_id uuid not null references public.users(id) on delete cascade,
  quantity numeric,
  agreed_price numeric,
  transport_needed boolean default false,
  status text,
  created_at timestamptz not null default now()
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  farmer_id uuid not null references public.users(id) on delete cascade,
  category text,
  amount numeric,
  date date
);

create table if not exists public.transporters (
  user_id uuid primary key references public.users(id) on delete cascade,
  vehicle_type text,
  capacity numeric,
  routes jsonb
);

create table if not exists public.storage_providers (
  user_id uuid primary key references public.users(id) on delete cascade,
  capacity numeric,
  cost_per_day numeric,
  location_lat numeric,
  location_lng numeric
);

create table if not exists public.price_history (
  id uuid primary key default gen_random_uuid(),
  crop_name text,
  mandi_price numeric,
  platform_price numeric,
  date date
);

alter table public.users enable row level security;
alter table public.crops enable row level security;
alter table public.listings enable row level security;
alter table public.orders enable row level security;
alter table public.expenses enable row level security;

create policy "users_select_self_or_admin" on public.users
for select using (auth.uid() = id or exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'));

create policy "users_update_self_language" on public.users
for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "farmers_manage_own_crops" on public.crops
for all using (farmer_id = auth.uid()) with check (farmer_id = auth.uid());

create policy "buyers_view_approved_listings" on public.listings
for select using (
  status = 'approved' and exists (select 1 from public.users u where u.id = auth.uid() and u.role in ('buyer','admin'))
);

create policy "farmers_manage_their_listings" on public.listings
for all using (
  exists (
    select 1 from public.crops c
    where c.id = crop_id and c.farmer_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.crops c
    where c.id = crop_id and c.farmer_id = auth.uid()
  )
);

create policy "admin_full_access_listings" on public.listings
for all using (exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'));

create policy "buyers_manage_own_orders" on public.orders
for all using (buyer_id = auth.uid()) with check (buyer_id = auth.uid());

create policy "transporter_assigned_only" on public.orders
for select using (
  exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'transporter')
);

create policy "storage_provider_booking_visibility" on public.orders
for select using (
  exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'storage_provider')
);

create policy "admin_full_access_orders" on public.orders
for all using (exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'));
