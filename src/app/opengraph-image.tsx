import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          backgroundColor: "#07080a",
          backgroundImage:
            "radial-gradient(circle at 80% 18%, rgba(190, 242, 100, 0.18), transparent 45%), radial-gradient(circle at 20% 85%, rgba(59, 130, 246, 0.12), transparent 50%)",
          color: "#f5f7fa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              border: "1px solid rgba(255,255,255,0.16)",
              borderRadius: "999px",
              padding: "10px 20px",
              fontSize: "20px",
              color: "#bef264",
            }}
          >
            <span>●</span>
            <span>{siteConfig.person.location}</span>
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#9ca3af",
            }}
          >
            BSc (Hons) Computer Science · 2025
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            {siteConfig.person.name}
          </div>
          <div
            style={{
              fontSize: "32px",
              color: "#d1d5db",
              fontWeight: 500,
            }}
          >
            {siteConfig.person.fullTitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: "24px",
            fontSize: "20px",
            color: "#9ca3af",
          }}
        >
          <span>Full-Stack Web · Flutter Mobile · Applied AI</span>
          <span style={{ color: "#bef264" }}>github.com/Vihanga13</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
