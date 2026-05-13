/**
 * Admin allowlist from env (server / middleware). Comma-separated in ADMIN_EMAILS,
 * or a single ADMIN_EMAIL. Comparison is case-insensitive.
 * If unset/empty, no user is treated as admin (fail-closed).
 */
export function parseAdminEmailsFromEnv(): string[] {
  const listRaw = process.env.ADMIN_EMAILS?.trim();
  const single = process.env.ADMIN_EMAIL?.trim();
  const parts: string[] = [];
  if (listRaw) {
    parts.push(...listRaw.split(",").map((s) => s.trim().toLowerCase()));
  }
  if (single) {
    parts.push(single.toLowerCase());
  }
  return [...new Set(parts.filter(Boolean))];
}

export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  const allow = parseAdminEmailsFromEnv();
  if (allow.length === 0) return false;
  return allow.includes(email.trim().toLowerCase());
}
