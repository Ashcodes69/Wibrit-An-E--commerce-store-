import { NextResponse } from "next/server";
import Cart from "@/models/Cart";
import connectDb from "@/middleware/mongoose";

export async function GET(req: Request) {
  await connectDb();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  try {
    if (!userId) throw new Error("userId missing");
    const cart = await Cart.findOne({ userId });
    return NextResponse.json(cart || { userId, products: [] });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}
