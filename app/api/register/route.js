import { NextResponse } from "next/server";
import fs from "fs";

export async function POST(req) {

  const data = await req.json();

  // senitization
  const safeData = {
    eircode: String(data.eircode).replace(/[<>]/g, "").trim(),
    type: String(data.type).replace(/[<>]/g, "").trim(),
    brand: String(data.brand).replace(/[<>]/g, "").trim(),
    model: String(data.model).replace(/[<>]/g, "").trim(),
    serial: String(data.serial).replace(/[<>]/g, "").trim(),
    purchase: String(data.purchase).replace(/[<>]/g, "").trim(),
    warranty: String(data.warranty).replace(/[<>]/g, "").trim()
  };

  // validation
  const eircodeRegex = /^[A-Z]\d{2}\s\d{4}$/;
  const modelRegex = /^\d{3}-\d{3}-\d{4}$/;
  const serialRegex = /^\d{4}-\d{4}-\d{4}$/;

  if (!eircodeRegex.test(safeData.eircode)) {
    return NextResponse.json({ message: "Invalid Eircode" });
  }

  if (!safeData.brand) {
    return NextResponse.json({ message: "Brand required" });
  }

  if (!modelRegex.test(safeData.model)) {
    return NextResponse.json({ message: "Invalid Model" });
  }

  if (!serialRegex.test(safeData.serial)) {
    return NextResponse.json({ message: "Invalid Serial" });
  }

  // safe successfully filled froms
  const file = "./inventory.json";
  let inventory = [];

  if (fs.existsSync(file)) {
    inventory = JSON.parse(fs.readFileSync(file));
  }

  inventory.push(safeData);

  fs.writeFileSync(file, JSON.stringify(inventory, null, 2));

  return NextResponse.json({
    message: "Item added successfully"
  });
}