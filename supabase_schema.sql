-- ==============================================================================
-- ESQUEMA INICIAL DE BASE DE DATOS EN SUPABASE: LEADS & CRM DE VENTAS
-- Ejecuta este script en el SQL Editor de tu proyecto en Supabase
-- ==============================================================================

-- 1. Crear tipo enumerado para estado del lead
do $$ begin
  create type lead_status as enum ('no_contactado', 'contactado', 'en_seguimiento', 'ganado', 'descartado');
exception
  when duplicate_object then null;
end $$;

-- 2. Crear tabla de leads
create table if not exists public.leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text not null,
  email text not null,
  phone text not null,
  answers jsonb not null default '{}'::jsonb,
  score integer not null default 0,
  temperature text not null check (temperature in ('hot', 'warm', 'cold')),
  status lead_status not null default 'no_contactado',
  notes text,
  contacted_at timestamp with time zone,
  contacted_by uuid references auth.users(id) on delete set null
);

-- 3. Índices para optimizar el ordenamiento por temperatura y consultas del vendedor
create index if not exists idx_leads_score_desc on public.leads(score desc, created_at desc);
create index if not exists idx_leads_status on public.leads(status);
create index if not exists idx_leads_temperature on public.leads(temperature);

-- 4. Habilitar Row Level Security (RLS)
alter table public.leads enable row level security;

-- Política 1: Permitir inserción anónima desde el formulario de la landing page
create policy "Permitir insercion publica desde landing"
  on public.leads
  for insert
  with check (true);

-- Política 2: Solo usuarios autenticados (tu equipo de ventas) pueden leer los leads
create policy "Solo vendedores autenticados pueden ver leads"
  on public.leads
  for select
  to authenticated
  using (true);

-- Política 3: Solo usuarios autenticados pueden actualizar el estado y notas
create policy "Solo vendedores autenticados pueden actualizar leads"
  on public.leads
  for update
  to authenticated
  using (true);
