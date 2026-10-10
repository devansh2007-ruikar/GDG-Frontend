import { ImageResponse } from "next/og";

export const alt = "Google Developer Groups RBU • On Campus";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/**
 * Dynamic Open Graph Image Generator.
 * Generates high-impact 1200x630 social preview card with neo-brutalist aesthetics.
 */
export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "60px 70px",
          backgroundColor: "#FAF9F5",
          border: "16px solid #000000",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Header Tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              padding: "10px 24px",
              backgroundColor: "#FFC400",
              color: "#000000",
              fontSize: "20px",
              fontWeight: 800,
              borderRadius: "999px",
              border: "3px solid #000000",
              boxShadow: "4px 4px 0px #000000",
              letterSpacing: "1px",
            }}
          >
            GDG ON CAMPUS
          </div>
          <div
            style={{
              padding: "10px 24px",
              backgroundColor: "#4C8DF6",
              color: "#FFFFFF",
              fontSize: "20px",
              fontWeight: 800,
              borderRadius: "999px",
              border: "3px solid #000000",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            RAMDEOBABA UNIVERSITY
          </div>
        </div>

        {/* Central Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#000000",
              lineHeight: 1.1,
              letterSpacing: "-1px",
            }}
          >
            GOOGLE DEVELOPER GROUPS, RBU
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#555555",
              maxWidth: "920px",
              lineHeight: 1.4,
              fontWeight: 500,
            }}
          >
            Empowering students with cutting-edge tech skills, community, and resources for a future in technology.
          </div>
        </div>

        {/* Bottom Strip */}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "4px dashed #000000",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: 700, color: "#000000" }}>
            gdgrbu.app • Orientation Oct 7, 2024
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "999px", backgroundColor: "#4C8DF6" }} />
            <div style={{ width: "24px", height: "24px", borderRadius: "999px", backgroundColor: "#F86B5E" }} />
            <div style={{ width: "24px", height: "24px", borderRadius: "999px", backgroundColor: "#FFC400" }} />
            <div style={{ width: "24px", height: "24px", borderRadius: "999px", backgroundColor: "#00D26A" }} />
            <div style={{ width: "24px", height: "24px", borderRadius: "999px", backgroundColor: "#7B7FF6" }} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
