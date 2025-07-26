import { redis } from "@/lib/redis"; // Upstash Redis client

export async function POST(request: Request) {
  const event = await request.json(); // TODO: validate & auth
  await redis.publish("heartrate", JSON.stringify(event));
  await redis.set("heartrate", JSON.stringify(event));

  return Response.json({ ok: true });
}

export async function GET() {
  const heartrate = await redis.get("heartrate");

  if (!heartrate) {
    return new Response(JSON.stringify({ error: "No heartrate found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  return Response.json(heartrate);
}
