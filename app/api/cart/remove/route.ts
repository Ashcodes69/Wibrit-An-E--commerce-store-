import { NextResponse } from "next/server";
import Cart from "@/models/Cart";
import connectDb from "@/middleware/mongoose";

export async function POST(req: Request) {
  await connectDb();
  const body = await req.json();
  const { userId, productId, size, color } = body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("cart not found");
    cart.products = cart.products.filter(
      (p: { productId: string; size: string; color: string }) =>
        !(p.productId === productId && p.size === size && p.color === color)
    );

    await cart.save();
    return NextResponse.json(
      { success: true, message: "item removed from cart" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to remove item " },
      { status: 500 }
    );
  }
}
