import { ImageResponse } from "next/og";

export const alt = "Gauthier Minor — Développeur Full-Stack & UI Architect";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#070709",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle grid pattern border */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "32px",
            pointerEvents: "none",
          }}
        />

        {/* Top bar: Logo & Availability status */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                backgroundColor: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "900",
                color: "#000000",
                fontFamily: "monospace",
              }}
            >
              GM
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#ffffff", fontSize: "20px", fontWeight: "700" }}>
                Gauthier Minor
              </span>
              <span style={{ color: "#a1a1aa", fontSize: "14px", fontFamily: "monospace" }}>
                gminor.dev
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "9999px",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              color: "#34d399",
              fontSize: "14px",
              fontWeight: "600",
              fontFamily: "monospace",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: "#10b981",
              }}
            />
            <span>Disponible pour projets</span>
          </div>
        </div>

        {/* Main Center Marquee */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              color: "#a1a1aa",
              fontSize: "14px",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            // DÉVELOPPEUR FULL-STACK &bull; NEXT.JS &bull; PRESTASHOP &bull; SYMFONY
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: "56px",
              fontWeight: "900",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
            }}
          >
            Ingénierie logicielle &amp; solutions web d&apos;exception.
          </div>
          <div
            style={{
              color: "#d4d4d8",
              fontSize: "22px",
              lineHeight: 1.5,
              maxWidth: "900px",
            }}
          >
            Conception de plateformes SaaS, sites vitrines haute performance et boutiques e-commerce à fort trafic.
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#ffffff", fontSize: "28px", fontWeight: "800", fontFamily: "monospace" }}>
              &lt; 0.4s
            </span>
            <span style={{ color: "#71717a", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
              Vitesse de chargement
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#34d399", fontSize: "28px", fontWeight: "800", fontFamily: "monospace" }}>
              100 / 100
            </span>
            <span style={{ color: "#71717a", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
              Score Google Lighthouse
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#ffffff", fontSize: "28px", fontWeight: "800", fontFamily: "monospace" }}>
              9 Projets
            </span>
            <span style={{ color: "#71717a", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
              En production
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
