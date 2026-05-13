import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { isAdminEmail } from "@/lib/admin-emails";

/** Verified session + service client (bypasses RLS). Use only after route/middleware gates. */
export async function requireAdminService() {
  const auth = await createClient();
  const {
    data: { user },
  } = await auth.auth.getUser();
  if (!user) {
    redirect("/admin/login");
  }
  if (!isAdminEmail(user.email)) {
    redirect("/admin/forbidden");
  }
  return { user, db: createServiceClient(), auth };
}
