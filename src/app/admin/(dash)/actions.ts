"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/admin-emails";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function deleteSubmission(id: string): Promise<{ ok: boolean }> {
  const idTrim = id?.trim();
  if (!idTrim) return { ok: false };

  const auth = await createClient();
  const {
    data: { user },
  } = await auth.auth.getUser();
  if (!user?.email || !isAdminEmail(user.email)) {
    return { ok: false };
  }

  const db = createServiceClient();
  const { data: row } = await db
    .from("submissions")
    .select("attachment_path, attachment_paths")
    .eq("id", idTrim)
    .maybeSingle();

  const pathsToRemove = new Set<string>();
  if (row?.attachment_path && String(row.attachment_path).trim()) {
    pathsToRemove.add(String(row.attachment_path).trim());
  }
  const arr = row?.attachment_paths;
  if (Array.isArray(arr)) {
    for (const p of arr) {
      if (typeof p === "string" && p.trim()) pathsToRemove.add(p.trim());
    }
  }

  if (pathsToRemove.size > 0) {
    const { error: rmErr } = await db.storage
      .from("form-attachments")
      .remove([...pathsToRemove]);
    if (rmErr) {
      console.error("Storage silme:", rmErr);
    }
  }

  const { error } = await db.from("submissions").delete().eq("id", idTrim);
  if (error) {
    console.error(error);
    return { ok: false };
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/${idTrim}`);
  return { ok: true };
}
