import { ImageResponse } from "next/og";
import { getProduct } from "@/lib/products";
import { getSpecs } from "@/lib/specs";

export const runtime = "edge";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = getProduct(slug);
  const detail = product ? getSpecs(product.id) : undefined;

  const title = product?.name ?? "VoltPak";
  const sub = detail?.shortDesc ?? "Silent power. Serious output.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #0A0A0A 0%, #1D1D1F 60%, #003D4D 100%)",
          padding: 80,
          color: "white",
          fontFamily: "system-ui",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 28,
              height: 28,
              background: "#00D4FF",
              clipPath:
                "polygon(55% 0%, 20% 55%, 47% 55%, 40% 100%, 80% 40%, 55% 40%, 62% 0%)",
            }}
          />
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
            VoltPak
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#A1A1A6",
              maxWidth: 1000,
              lineHeight: 1.3,
            }}
          >
            {sub}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", gap: 20, color: "#00D4FF" }}>
            {detail?.highlights.slice(0, 3).map((h) => (
              <div
                key={h.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  minWidth: 160,
                }}
              >
                <div style={{ fontSize: 40, fontWeight: 700 }}>{h.stat}</div>
                <div style={{ fontSize: 16, color: "#A1A1A6" }}>{h.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
