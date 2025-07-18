import { NextResponse } from "next/server";
import UserProfile from "@/models/UserProfile";
import connectDb from "@/middleware/mongoose";

export const GET = async (req: Request) => {
  await connectDb();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { success: false, error: "Email is required" },
      { status: 400 }
    );
  }
  try {
    const user = await UserProfile.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, user },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
