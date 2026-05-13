/**
 * Supabase Auth’ta bir kullanıcının şifresini günceller (service role).
 *
 *   UPDATE_EMAIL="ahmetserhatelmas@gmail.com" NEW_PASSWORD="..." node --env-file=.env scripts/update-user-password.mjs
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const targetEmail = process.env.UPDATE_EMAIL?.trim().toLowerCase();
const newPassword = process.env.NEW_PASSWORD;

if (!url || !serviceKey) {
  console.error("Eksik: NEXT_PUBLIC_SUPABASE_URL veya SUPABASE_SERVICE_ROLE_KEY (.env)");
  process.exit(1);
}
if (!targetEmail || !newPassword) {
  console.error("Eksik: UPDATE_EMAIL ve NEW_PASSWORD");
  process.exit(1);
}

const headers = {
  apikey: serviceKey,
  Authorization: `Bearer ${serviceKey}`,
};

/** Sayfalı kullanıcı listesinde e-postayı ara */
async function findUserIdByEmail() {
  const perPage = 200;
  for (let page = 1; page <= 50; page++) {
    const res = await fetch(
      `${url}/auth/v1/admin/users?page=${page}&per_page=${perPage}`,
      { headers },
    );
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("Liste hatası:", res.status, body.msg || JSON.stringify(body));
      process.exit(1);
    }
    const users = body.users ?? [];
    const hit = users.find((u) => (u.email || "").toLowerCase() === targetEmail);
    if (hit) return hit.id;
    if (users.length < perPage) break;
  }
  return null;
}

const userId = await findUserIdByEmail();
if (!userId) {
  console.error("Bu e-postayla kullanıcı bulunamadı:", targetEmail);
  process.exit(1);
}

const res = await fetch(`${url}/auth/v1/admin/users/${userId}`, {
  method: "PUT",
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ password: newPassword }),
});

const out = await res.json().catch(() => ({}));
if (!res.ok) {
  const msg = out.msg || out.message || out.error_description || JSON.stringify(out);
  console.error("Şifre güncellenemedi:", res.status, msg);
  process.exit(1);
}

console.log("Tamam. Şifre güncellendi:", out.email ?? targetEmail, "id:", out.id ?? userId);
