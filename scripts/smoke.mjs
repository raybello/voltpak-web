// Smoke test against a running server: `BASE_URL=http://localhost:3000 node scripts/smoke.mjs`
// Used locally and in CI after `next build && next start`.
const BASE = process.env.BASE_URL ?? "http://localhost:3000";
let failed = 0;

async function check(name, fn) {
  try {
    await fn();
    console.log(`ok   ${name}`);
  } catch (e) {
    failed++;
    console.error(`FAIL ${name}: ${e.message}`);
  }
}
const assert = (c, m) => { if (!c) throw new Error(m); };
const get = (p, init) => fetch(BASE + p, { redirect: "manual", ...init });
const post = (p, body, headers = {}) =>
  fetch(BASE + p, { method: "POST", headers: { "content-type": "application/json", ...headers }, body: JSON.stringify(body) });

for (const p of ["/", "/shop", "/compare", "/about", "/support", "/support/contact", "/press",
  "/products/voltpak-1000", "/legal/privacy", "/legal/terms", "/notify/confirmed", "/robots.txt", "/sitemap.xml"]) {
  await check(`GET ${p} -> 200`, async () => assert((await get(p)).status === 200, "status"));
}

await check("unknown route -> 404", async () => assert((await get("/nope")).status === 404, "status"));

for (const p of ["/cart", "/checkout", "/account"]) {
  await check(`${p} redirects to /shop (commerce disabled)`, async () => {
    const r = await get(p);
    assert(r.status === 307 && new URL(r.headers.get("location"), BASE).pathname === "/shop", `got ${r.status}`);
  });
}

await check("security headers present", async () => {
  const h = (await get("/")).headers;
  for (const k of ["content-security-policy", "strict-transport-security", "x-frame-options", "x-content-type-options", "referrer-policy"])
    assert(h.get(k), `missing ${k}`);
  assert(!h.get("x-powered-by"), "x-powered-by leaked");
});

await check("no fabricated ratings / press logos on home", async () => {
  const html = await (await get("/")).text();
  for (const bad of ["2,300", "Wirecutter", "verified buyers"]) assert(!html.includes(bad), `found "${bad}"`);
});

await check("product page has no aggregateRating and no price", async () => {
  const html = await (await get("/products/voltpak-1000")).text();
  assert(!html.includes("aggregateRating"), "aggregateRating present");
  assert(!/"price":/.test(html), "price in JSON-LD while pre-launch");
});

await check("sitemap uses canonical domain", async () => {
  const xml = await (await get("/sitemap.xml")).text();
  assert(xml.includes("voltpak.ca") && !xml.includes("example.com"), "bad domain");
});

await check("contact rejects cross-origin POST", async () => {
  const r = await post("/api/contact", { email: "a@b.co", message: "hi" }, { origin: "https://evil.example" });
  assert(r.status === 403, `got ${r.status}`);
});
await check("contact validates email", async () => {
  const r = await post("/api/contact", { email: "nope", message: "hi" });
  assert(r.status === 400, `got ${r.status}`);
});
await check("contact honeypot returns ok without sending", async () => {
  const r = await post("/api/contact", { email: "a@b.co", message: "hi", website: "http://spam" });
  assert(r.status === 200, `got ${r.status}`);
});
await check("notify validates email", async () => {
  const r = await post("/api/notify", { email: "nope" });
  assert(r.status === 400, `got ${r.status}`);
});
await check("notify rejects cross-origin POST", async () => {
  const r = await post("/api/notify", { email: "a@b.co" }, { origin: "https://evil.example" });
  assert(r.status === 403, `got ${r.status}`);
});
await check("confirm rejects forged token", async () => {
  const r = await get("/api/notify/confirm?token=abc.def");
  assert(r.status === 303 && /\/notify\/(invalid|error)$/.test(r.headers.get("location")), `got ${r.status}`);
});

if (failed) { console.error(`\n${failed} check(s) failed`); process.exit(1); }
console.log("\nall checks passed");
