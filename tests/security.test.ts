import { describe, expect, it, vi } from "vitest";
import { escapeHtml, originAllowed, rateLimit, signToken, str, verifyToken } from "@/lib/security";

describe("signed tokens", () => {
  it("round-trips a payload", () => {
    const t = signToken("confirm", { email: "a@b.co" });
    expect(verifyToken("confirm", t)?.email).toBe("a@b.co");
  });
  it("rejects a token used for another purpose", () => {
    const t = signToken("confirm", { email: "a@b.co" });
    expect(verifyToken("unsub", t)).toBeNull();
  });
  it("rejects tampered payloads and signatures", () => {
    const t = signToken("unsub", { email: "a@b.co" });
    const [body, sig] = t.split(".");
    const forged = Buffer.from(JSON.stringify({ email: "victim@x.co", p: "unsub" })).toString("base64url");
    expect(verifyToken("unsub", `${forged}.${sig}`)).toBeNull();
    expect(verifyToken("unsub", `${body}.AAAA`)).toBeNull();
    expect(verifyToken("unsub", "garbage")).toBeNull();
  });
  it("rejects expired tokens", () => {
    vi.useFakeTimers();
    const t = signToken("confirm", { email: "a@b.co" }, 60);
    vi.advanceTimersByTime(61_000);
    expect(verifyToken("confirm", t)).toBeNull();
    vi.useRealTimers();
  });
});

describe("originAllowed", () => {
  const req = (origin?: string) =>
    new Request("https://voltpak.ca/api/x", { method: "POST", headers: origin ? { origin, host: "voltpak.ca" } : { host: "voltpak.ca" } });
  it("allows same-site, www and missing origin", () => {
    expect(originAllowed(req("https://voltpak.ca"))).toBe(true);
    expect(originAllowed(req("https://www.voltpak.ca"))).toBe(true);
    expect(originAllowed(req())).toBe(true);
  });
  it("blocks other origins", () => {
    expect(originAllowed(req("https://evil.example"))).toBe(false);
    expect(originAllowed(req("not a url"))).toBe(false);
  });
});

describe("rateLimit (in-memory fallback)", () => {
  it("allows up to the limit then blocks", async () => {
    const k = `t:${Math.random()}`;
    expect(await rateLimit(k, 2, 60)).toBe(true);
    expect(await rateLimit(k, 2, 60)).toBe(true);
    expect(await rateLimit(k, 2, 60)).toBe(false);
  });
});

describe("helpers", () => {
  it("str trims, caps and ignores non-strings", () => {
    expect(str("  hi  ", 10)).toBe("hi");
    expect(str("abcdef", 3)).toBe("abc");
    expect(str(42, 10)).toBe("");
  });
  it("escapeHtml escapes markup", () => {
    expect(escapeHtml(`<a href="x">&'`)).toBe("&lt;a href=&quot;x&quot;&gt;&amp;&#39;");
  });
});
