import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

export async function POST(req: Request) {
  await connectDb();
  const body = await req.json();
  try {
    const {Name, email, password}= body
    const u=new User({
      Name,
      email,
      password
    })
    await u.save()
     return NextResponse.json(
      { sucess: true, message: "your account is created" },
      { status: 200 })
  } catch (error) {
 console.error(error);
    return NextResponse.json(
      { sucess: false, error: "internal server error in creating your account" },
      { status: 400 }
    );
  }
}
