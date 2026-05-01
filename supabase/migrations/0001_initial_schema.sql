create extension if not exists vector;

create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  plan text not null default 'free',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_profiles enable row level security;

create policy "Users can read their own profile"
  on public.user_profiles
  for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.user_profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  chinese_name text not null,
  english_name text,
  credit_code text,
  legal_person text,
  registered_capital text,
  established_date date,
  status text,
  base text,
  address text,
  business_scope text,
  website text,
  raw_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists companies_credit_code_idx
  on public.companies (credit_code)
  where credit_code is not null;

alter table public.companies enable row level security;

create policy "Authenticated users can read companies"
  on public.companies
  for select
  to authenticated
  using (true);

create table if not exists public.supplier_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  company_id uuid references public.companies(id) on delete cascade,
  supplier_type text not null,
  risk_level text not null,
  score integer not null,
  summary text,
  report_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.supplier_reports enable row level security;

create policy "Users can read their own supplier reports"
  on public.supplier_reports
  for select
  using (auth.uid() = user_id);

create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text,
  industry text,
  source_language text,
  target_language text,
  created_at timestamptz not null default now()
);

alter table public.chat_sessions enable row level security;

create policy "Users can manage their own chat sessions"
  on public.chat_sessions
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.chat_sessions(id) on delete cascade,
  role text not null,
  content text not null,
  ai_analysis jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.chat_messages enable row level security;

create policy "Users can read messages in their sessions"
  on public.chat_messages
  for select
  using (
    exists (
      select 1 from public.chat_sessions
      where chat_sessions.id = chat_messages.session_id
      and chat_sessions.user_id = auth.uid()
    )
  );

create table if not exists public.usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  feature text not null,
  provider text,
  token_count integer,
  api_cost numeric(12, 6),
  created_at timestamptz not null default now()
);

alter table public.usage_logs enable row level security;

create policy "Users can read their own usage logs"
  on public.usage_logs
  for select
  using (auth.uid() = user_id);

create table if not exists public.ai_knowledge_documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  category text not null,
  embedding vector(1536),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.ai_knowledge_documents enable row level security;
