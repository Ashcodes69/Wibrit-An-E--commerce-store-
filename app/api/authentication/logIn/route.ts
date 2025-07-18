import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  await connectDb();
  const body = await req.json();

  try {
    const { password } = body;
    const user = await User.findOne({ email: body.email });

    if (user) {
      const bytes = CryptoJS.AES.decrypt(
        user.password,
        process.env.AES_SECREAT!
      );
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
      if (password === decryptedPassword) {
        const token = jwt.sign(
          { id: user._id, email: user.email, name: user.Name },
          process.env.JWT_SECRET!,
          { expiresIn: "7d" }
        );
        return NextResponse.json(
          {
            token,
            Name: user.Name,
            email: user.email,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { success: false, error: "Invalid credentials" },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { success: false,code:"noUser", error: "User not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { sucess: false, error: "Internal server error while logging in" },
      { status: 400 }
    );
  }
}
