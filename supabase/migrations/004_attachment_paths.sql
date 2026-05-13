-- Çoklu form eki: storage yolları dizisi. Eski tek sütun (attachment_path) birinci dosya ile uyumlu kalır.
alter table public.submissions add column if not exists attachment_paths text[];

update public.submissions
set attachment_paths = array[attachment_path]::text[]
where attachment_path is not null
  and btrim(attachment_path) <> ''
  and (attachment_paths is null or cardinality(attachment_paths) = 0);
