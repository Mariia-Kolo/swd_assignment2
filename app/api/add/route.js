import { db } from "@/lib/db";

export async function POST(req) {
  const data = await req.json();

  // Insert user
  const [userResult] = await db.execute(
    `INSERT INTO User (FirstName, LastName, Address, Mobile, Email, Eircode)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.firstName,
      data.lastName,
      data.address,
      data.mobile,
      data.email,
      data.eircode,
    ]
  );

  const userId = userResult.insertId;

  // Insert appliance
  await db.execute(
    `INSERT INTO Appliance (ApplianceType, Brand, ModelNumber, SerialNumber, PurchaseDate, WarrantyExpiration, Cost, UserID)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.type,
      data.brand,
      data.model,
      data.serial,
      data.purchaseDate,
      data.warranty,
      data.cost,
      userId,
    ]
  );

  return Response.json({ message: "Appliance added successfully" });
}