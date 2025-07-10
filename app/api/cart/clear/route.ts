import { NextResponse } from "next/server";
import Cart from "@/models/Cart";
import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";

export async function DELETE(req: Request) {
  await connectDb();
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("userId");

  if (!token) return NextResponse.json({ success: false, message: "No token provided" }, { status: 400 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const userId = decoded.id;

    await Cart.findOneAndDelete({ userId });

    return NextResponse.json({ success: true, message: "Cart cleared" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json({ success: false, message: "Failed to clear cart" }, { status: 500 });
  }
}

