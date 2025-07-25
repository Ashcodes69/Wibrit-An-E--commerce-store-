import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  await connectDb();
  const body = await req.json();
  try {
    const { Name, email } = body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { sucess: false, code:"existingUser", message: "Account already exists. Please log in." },
        { status: 400 }
      );
    }
    const u = new User({
      Name,
      email,
      password: CryptoJS.AES.encrypt(
        body.password,
        process.env.AES_SECREAT!
      ).toString(),
    });
    await u.save();
    const token = jwt.sign(
      { id: u._id, email: u.email, name: u.Name },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      { sucess: true, message: "your account is created", token },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        sucess: false,
        message: "internal server error in creating your account",
      },
      { status: 400 }
    );
  }
}
