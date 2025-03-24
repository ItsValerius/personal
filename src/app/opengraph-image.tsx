import { ImageResponse } from "next/og";

// Image metadata
export const alt = "About Me";
export const size = {
  width: 128,
  height: 128,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  // Font loading, process.cwd() is Next.js project directory

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <svg
        width="32"
        height="32"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="#fff6ea"
          stroke="#fff6ea"
          strokeWidth="2"
        />

        <path
          d="M20 20L32 44L44 20"
          stroke="#cc7900"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
