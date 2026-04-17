import { NextResponse } from "next/server";

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

  let errors = {};

  // validation
  if (!safeData.eircode.match(/^[A-Z]\d{2}\s\d{4}$/)) {
    errors.eircode = "Invalid Eircode";
  }

  if (!safeData.brand) {
    errors.brand = "Brand required";
  }

  if (!safeData.model.match(/^\d{3}-\d{3}-\d{4}$/)) {
    errors.model = "Invalid Model";
  }

  if (!safeData.serial.match(/^\d{4}-\d{4}-\d{4}$/)) {
    errors.serial = "Invalid Serial";
  }

  // return errors
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors });
  }

  return NextResponse.json({
    message: "Valid data"
  });
}