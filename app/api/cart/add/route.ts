import { NextResponse } from "next/server";
import Cart from "@/models/Cart";
import connectDb from "@/middleware/mongoose";

export async function POST(req: Request) {
  await connectDb();
  const body = await req.json();
  try {
    const { userId, product } = body;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, produts: [product] });
    } else {
      const index = cart.products.findOne(
        (p: { productId: string; size: string; color: string }) =>
          p.productId === product.productId &&
          p.size === product.size &&
          p.color === p.color
      );
      if (index > -1) {
        cart.products[index].quantity += product.quantity;
      } else {
        cart.products.push(product);
      }
    }
    await cart.save();
    return NextResponse.json(
      { success: true, message: "Product added to the cart" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to add product in the cart" },
      { status: 500 }
    );
  }
}
