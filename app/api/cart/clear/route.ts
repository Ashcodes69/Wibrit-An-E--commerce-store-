import { NextResponse } from "next/server";
import Cart from "@/models/Cart";
import connectDb from "@/middleware/mongoose";

export async function POST(req: Request) {
  await connectDb();
  const body = await req.json();
  const { userId } = body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("cart not found");
    cart.products = [];
    await cart.save();
    return NextResponse.json(
      { success: true, message: "cart cleaned" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to clean caart" },
      { status: 500 }
    );
  }
}
