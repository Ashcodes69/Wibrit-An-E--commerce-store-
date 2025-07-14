import { NextResponse } from "next/server";
import connectDb from "@/middleware/mongoose";
import Pincodes from "@/models/Pincodes";

export async function GET(req: Request) {
  await connectDb();

  try {
    const url  = new URL(req.url);
    const code = url.searchParams.get("code");  
    if (code) {
      const pin = await Pincodes.findOne({ code: Number(code) }); 
      if (!pin) {
        return NextResponse.json(
          { success: false, message: "Pincode not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, pincode: pin });
    }
    const pins = await Pincodes.find({ isActive: true }).sort({ code: 1 });
    return NextResponse.json({ success: true, pincodes: pins });
  } catch (err) {
    console.error(" GET /api/pincodes error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
