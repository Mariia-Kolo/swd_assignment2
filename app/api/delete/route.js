import { db } from "@/lib/db";

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const serial = searchParams.get("serial");

  await db.execute(
    "DELETE FROM Appliance WHERE SerialNumber = ?",
    [serial]
  );

  return Response.json({ message: "Appliance deleted" });
}