/**
 * Tek seferlik: Supabase Auth’ta kullanıcı oluşturur (Realtime/WebSocket yok, sadece fetch).
 *
 *   ADMIN_EMAIL="..." ADMIN_PASSWORD="..." node --env-file=.env scripts/create-admin.mjs
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.ADMIN_EMAIL?.trim();
const password = process.env.ADMIN_PASSWORD;

if (!url || !serviceKey) {
  console.error("Eksik: NEXT_PUBLIC_SUPABASE_URL veya SUPABASE_SERVICE_ROLE_KEY (.env)");
  process.exit(1);
}
if (!email || !password) {
  console.error("Eksik: ADMIN_EMAIL ve ADMIN_PASSWORD");
  process.exit(1);
}

const res = await fetch(`${url}/auth/v1/admin/users`, {
  method: "POST",
  headers: {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email,
    password,
    email_confirm: true,
  }),
});

const body = await res.json().catch(() => ({}));

if (!res.ok) {
  const msg = body.msg || body.message || body.error_description || JSON.stringify(body);
  if (res.status === 422 || String(msg).toLowerCase().includes("registered")) {
    console.error("Bu e-posta zaten kayıtlı:", email);
    process.exit(1);
  }
  console.error("Hata:", res.status, msg);
  process.exit(1);
}

const user = body;
console.log("Tamam. Kullanıcı:", user.email ?? email, "id:", user.id);
