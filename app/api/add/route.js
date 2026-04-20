import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try{
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

    return NextResponse.json(
      { message: "Appliance added successfully" },
      { status: 201 }
   );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 501 }
    );
  };
}