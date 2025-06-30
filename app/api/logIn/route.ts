import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

export async function POST(req: Request) {
  await connectDb();
  const body = await req.json();
  try {
    const {password}= body
    const user = await User.findOne({email:body.email})
    if(user){
      if(password === user.password){
        return NextResponse.json(
      { sucess: true, message: "you logged in", Name:user.Name ,email:user.email},
      { status: 200 }
        )
      }else {
        return NextResponse.json(
          { success: false, error: "Invalid credentials" },
          { status: 401 }
        );
      }
    }else {
      return NextResponse.json(
        { success: false, error: "User not found" },
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
