import { db } from "@/lib/db";


export async function PUT(req) {
  const data = await req.json();

  await db.execute(
    `UPDATE Appliance 
     SET Brand=?, ModelNumber=? 
     WHERE SerialNumber=?`,
    [data.brand, data.model, data.serial]
  );

  return Response.json({ message: "Updated" });
}