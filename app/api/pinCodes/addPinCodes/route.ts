import { NextResponse } from "next/server";
import connectDb from "@/middleware/mongoose";
import Pincodes from "@/models/Pincodes";

export async function POST(req: Request) {
  await connectDb();
  const body = await req.json();
  try {
     for (let i = 0; i < body.length; i++) {
    const { code, city, state, isActive } = body[i];
    const existingPincode = await Pincodes.findOne({ code });
    if (existingPincode) {
      return NextResponse.json(
        { sucess: false, message: "Pincode is already added" },
        { status: 400 }
      );
    }
    const p = new Pincodes({
      code,
      city,
      state,
      isActive,
    });
    await p.save();
  }
    return NextResponse.json(
      { sucess: true, message: "Pincodes is added" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        sucess: false,
        message: "internal server error in adding pincodes",
      },
      { status: 400 }
    );
  }
}
