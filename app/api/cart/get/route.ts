import { NextResponse } from "next/server";
import Cart from "@/models/Cart";
import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

export async function GET(req: Request) {
  await connectDb();
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("userId");

  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    if (!decoded?.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const userId = decoded.id;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json({ userId, products: [] });
    }
    return NextResponse.json({ userId, products: cart.products });
  } catch (err) {
    console.error(" Error in GET cart:", err);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}
