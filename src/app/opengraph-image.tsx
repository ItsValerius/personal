import { ImageResponse } from "next/og";

export const alt = "About Me";
export const size = {
  width: 128,
  height: 128,
};
export const runtime = "edge";
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary">
          <img
            src={
              (process.env.VERCEL_PROJECT_PRODUCTION_URL
                ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
                : `http://localhost:${process.env.PORT || 3000}`) + "/me.png"
            }
            height="128"
            width="128"
            alt="me"
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
