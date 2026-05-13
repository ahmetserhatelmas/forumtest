-- Hardening: lock down SECURITY DEFINER RPC and remove broad authenticated read policies.
-- Apply in Supabase SQL Editor or via CLI migrations.
--
-- Auth: enable "Leaked password protection" in Dashboard → Authentication → Providers → Email
-- (HaveIBeenPwned). That setting is not representable in SQL.

-- 1) Revoke API access to public.rls_auto_enable (if it exists). Advisor-safe default.
DO $$
DECLARE
  ident text;
BEGIN
  SELECT pg_get_function_identity_arguments(p.oid)
    INTO ident
  FROM pg_proc p
  JOIN pg_namespace n ON n.oid = p.pronamespace
  WHERE n.nspname = 'public'
    AND p.proname = 'rls_auto_enable'
  ORDER BY p.oid
  LIMIT 1;

  IF ident IS NOT NULL THEN
    EXECUTE format(
      'REVOKE ALL ON FUNCTION public.rls_auto_enable(%s) FROM PUBLIC, anon, authenticated',
      ident
    );
  END IF;
END $$;

-- 2) Sensitive reads only via service_role (server after admin check), not JWT.
DROP POLICY IF EXISTS "submissions_select_authenticated" ON public.submissions;

-- 3) Attachment downloads via service_role signed URLs only.
DROP POLICY IF EXISTS "form_attachments_select_authenticated" ON storage.objects;
