import { NextResponse } from "next/server";
import connectDb from "@/middleware/mongoose";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}
export async function GET(req: Request) {
  await connectDb();

  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Missing Token" },
      { status: 400 }
    );
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const email = decoded.email;
    console.log(email)
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Invalid Token" },
        { status: 401 }
      );
    }
    const myOrders = await Order.find({ email }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, myOrders }, { status: 200 });
  } catch (err) {
    console.error("Error fetching orders:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
