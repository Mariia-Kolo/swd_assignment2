import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const serial = searchParams.get("serial");

    if (!serial) {
      return NextResponse.json(
        { message: "Serial number is required" },
        { status: 400 }
      );
    }

    const [rows] = await db.execute(
      "SELECT * FROM appliance WHERE SerialNumber = ?",
      [serial]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Appliance not found" },
        { status: 404 }
      );
    }

    const appliance = rows[0];
    return NextResponse.json({
      message: "Appliance found",
      brand: appliance.Brand,
      model: appliance.ModelNumber, 
      serial: appliance.SerialNumber,
      applianceId: appliance.ApplianceID,
      applianceType: appliance.ApplianceType,
      purchaseDate: appliance.PurchaseDate,
      warrantyExpiration: appliance.WarrantyExpiration,
      cost: appliance.Cost,
      userId: appliance.UserID
    });
    
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}