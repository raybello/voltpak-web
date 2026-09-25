import { describe, expect, it } from "vitest";
import { COMMERCE_ENABLED, isPreLaunch } from "@/lib/config";
import { DOWNLOADS_AVAILABLE } from "@/lib/downloads";
import { PRODUCTS } from "@/lib/products";
import { getSpecs } from "@/lib/specs";

describe("pre-launch (Path A) invariants", () => {
  it("keeps commerce and downloads off until Path B / real files", () => {
    expect(COMMERCE_ENABLED).toBe(false);
    expect(DOWNLOADS_AVAILABLE).toBe(false);
  });
  it("every product is in pre-launch mode", () => {
    for (const p of PRODUCTS) expect(isPreLaunch(p)).toBe(true);
  });
  it("no product copy claims granted certifications", () => {
    for (const p of PRODUCTS) {
      const d = getSpecs(p.id);
      expect(JSON.stringify(d)).not.toMatch(/\d+ SGS certifications/);
    }
  });
});
