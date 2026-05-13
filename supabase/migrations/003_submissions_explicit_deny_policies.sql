-- Security Advisor "RLS enabled no policy": submissions intentionally has no grants for
-- anon/authenticated (reads go through Next.js + service_role only). Explicit deny
-- documents intent and clears the info-level suggestion.

DROP POLICY IF EXISTS "submissions_deny_anon" ON public.submissions;
DROP POLICY IF EXISTS "submissions_deny_authenticated" ON public.submissions;

CREATE POLICY "submissions_deny_anon"
  ON public.submissions
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

CREATE POLICY "submissions_deny_authenticated"
  ON public.submissions
  FOR ALL
  TO authenticated
  USING (false)
  WITH CHECK (false);
