import { NextResponse } from "next/server";
import Cart from "@/models/Cart";
import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

export async function POST(req: Request) {
  await connectDb();

  try {
    const body = await req.json();

    const { userId: token, products } = body;

    if (!token || !products) {
      return NextResponse.json(
        { success: false, message: "Missing token or products" },
        { status: 400 }
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (!decoded?.id) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const userId = decoded.id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products });
    } else {
      cart.products = products;
    }

    await cart.save();

    return NextResponse.json({ success: true, message: "Cart saved" });
  } catch (error) {
    console.error(" Error saving cart:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save cart", error: error },
      { status: 500 }
    );
  }
}
