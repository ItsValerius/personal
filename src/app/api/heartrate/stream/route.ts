import { redis } from "@/lib/redis";
export const maxDuration = 150;
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const encoder = new TextEncoder();

  let dispose = () => {};

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      let closed = false;

      const safeEnqueue = (str: string) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(str));
        } catch {
          closed = true; // controller already closed -> stop further writes
        }
      };

      // --- Redis ---
      const sub = redis.subscribe("heartrate"); // or redis.duplicate().subscribe
      const onMessage = (e: { message: unknown }) => {
        safeEnqueue(`data: ${JSON.stringify(e.message)}\n\n`);
      };
      sub.on("message", onMessage);

      // --- Keep alive ---

      // --- One cleanup function ---
      dispose = () => {
        if (closed) return;
        closed = true;

        sub.unsubscribe(["heartrate"]);
        try {
          controller.close();
        } catch {}
      };

      // Next.js provides an AbortSignal
      req.signal?.addEventListener("abort", dispose);
    },

    cancel() {
      dispose();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
