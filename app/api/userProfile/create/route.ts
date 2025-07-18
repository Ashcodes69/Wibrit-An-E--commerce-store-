import { NextResponse } from "next/server";
import UserProfile from "@/models/UserProfile";
import connectDb from "@/middleware/mongoose";

export const POST = async (req: Request) => {
  await connectDb();
  const { name, email, address, phone, pincode, city, state } = await req.json();

  try {
    const existing = await UserProfile.findOne({ email });

    if (existing) {
      // Update existing profile
      await UserProfile.updateOne(
        { email },
        { name, address, phone, pincode, city, state }
      );
    } else {
      // Create new profile
      const up = new UserProfile({
        name,
        email,
        address,
        phone,
        pincode,
        city,
        state,
      });
      await up.save();
    }

    return NextResponse.json(
      { success: true, message: "User profile saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
