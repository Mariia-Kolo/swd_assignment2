import { db } from "@/lib/db";

export async function GET() {
  const [rows] = await db.execute("SELECT 1");
  return Response.json({ message: "DB connected", rows });
}