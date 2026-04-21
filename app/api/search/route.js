import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    //get serial from web
    const serial = searchParams.get("serial");

    //validate serial
    if (!serial) {
      return NextResponse.json(
        { message: "Serial number is required" },
        { status: 400 }
      );
    }

    //selecting needed rows
    const [rows] = await db.execute(
      "SELECT * FROM appliance WHERE SerialNumber = ?",
      [serial]
    );

    //in case not found
    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Appliance not found" },
        { status: 404 }
      );
    }

    //values to return if found
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
    
    //error case
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}