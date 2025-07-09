import { NextResponse } from "next/server";
import Cart from "@/models/Cart";
import connectDb from "@/middleware/mongoose";

export async function POST(req: Request) {
  await connectDb();
  const body = await req.json();
  const { userId, productId, size, color, quantity } = body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("Cart not found");

    const index = cart.products.findIndex(
      (p: { productId: string; size: string; color: string }) =>
        p.productId === productId && p.size === size && p.color === color
    );

    if (index > -1) {
      cart.products[index].quantity = quantity;
      await cart.save();
      return NextResponse.json({ success: true, message: "Cart updated" });
    } else {
      return NextResponse.json(
        { success: false, message: "Item not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to update cart" },
      { status: 500 }
    );
  }
}
