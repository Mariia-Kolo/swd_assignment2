import { db } from "@/lib/db";


export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const serial = searchParams.get("serial");

  const [rows] = await db.execute(
    "SELECT * FROM Appliance WHERE SerialNumber = ?",
    [serial]
  );

  if (rows.length === 0) {
    return Response.json({ message: "Not found" });
  }

  return Response.json(rows[0]);
}