import { NextResponse } from "next/server";
import connectDb from "@/middleware/mongoose";
import Pincodes from "@/models/Pincodes";

export async function DELETE(req: Request) {
  await connectDb();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body" },
      { status: 400 }
    );
  }
  if (!Array.isArray(body) || body.length === 0) {
    return NextResponse.json(
      { success: false, message: "Body must be a non‑empty array" },
      { status: 400 }
    );
  }
  const codes = body
    .map((item) => item?.code)
    .filter((c) => typeof c === "string" || typeof c === "number");
  if (codes.length === 0) {
    return NextResponse.json(
      { success: false, message: "No valid codes provided" },
      { status: 400 }
    );
  }
  try {
    const result = await Pincodes.deleteMany({ code: { $in: codes } });
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "No matching pincodes found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: `${result.deletedCount} pincode(s) deleted`,
        deletedCount: result.deletedCount,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE /api/pincodes error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
