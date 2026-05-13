-- QatarSpec Pro — pgvector migration
-- شغّل هذا في Supabase SQL Editor مرة واحدة فقط

-- 1. تفعيل pgvector extension
create extension if not exists vector;

-- 2. إضافة عمود embedding إذا لم يكن موجوداً
alter table qcs_chunks 
  add column if not exists embedding vector(768);

-- 3. إنشاء index للبحث السريع (HNSW أسرع من IVFFlat)
create index if not exists qcs_chunks_embedding_idx 
  on qcs_chunks 
  using hnsw (embedding vector_cosine_ops)
  with (m = 16, ef_construction = 64);

-- 4. دالة البحث بالـ vector similarity
create or replace function match_qcs_chunks(
  query_embedding vector(768),
  match_threshold float default 0.5,
  match_count     int   default 5,
  filter_file     text  default null
)
returns table (
  id           bigint,
  content      text,
  source_file  text,
  section_name text,
  page_num     int,
  similarity   float
)
language sql stable
as $$
  select
    id, content, source_file, section_name, page_num,
    1 - (embedding <=> query_embedding) as similarity
  from qcs_chunks
  where
    embedding is not null
    and (filter_file is null or source_file ilike '%' || filter_file || '%')
    and 1 - (embedding <=> query_embedding) > match_threshold
  order by embedding <=> query_embedding
  limit match_count;
$$;

-- 5. تحقق — يجب أن يُعيد اسم الدالة
select routine_name from information_schema.routines 
where routine_name = 'match_qcs_chunks';
