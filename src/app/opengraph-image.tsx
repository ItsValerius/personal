import { ImageResponse } from "next/og";
import { join } from "path";
import { readFile } from "fs/promises";

// Image metadata
export const alt = "About Me";
export const size = {
  width: 128,
  height: 128,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  const logoData = await readFile(join(process.cwd(), "public/me.jpg"));
  const logoSrc = Uint8Array.from(logoData).buffer;

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary">
        <img src={logoSrc} height="128" width="128" alt="me" />
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
