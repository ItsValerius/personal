import { redis } from "@/lib/redis"; // Upstash Redis client

export async function POST(request: Request) {
  const event = await request.json(); // TODO: validate & auth
  await redis.publish("heartrate", JSON.stringify(event));

  return Response.json({ ok: true });
}
