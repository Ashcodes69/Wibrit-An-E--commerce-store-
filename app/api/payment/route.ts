export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connectDb from "@/middleware/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";

export async function POST(req: Request) {
  await connectDb();
  const body = await req.json();

  try {
    const { email, address, amount, products } = body;
    const fullProducts = [];
    for (const item of products) {
      const dbProduct = await Product.findById(item.productId);
      const variant = dbProduct?.variants.find(
        (v) => v.color.toLowerCase() === item.color.toLowerCase() && v.size.toLowerCase() === item.size.toLowerCase()
      );

      if (!variant || variant.quantity < item.quantity) {
        return NextResponse.json(
          { success: false, message: `Product out of stock.` },
          { status: 400 }
        );
      }
      fullProducts.push({
        productId: item.productId,
        title: dbProduct?.title,
        size: item.size,
        color: item.color,
        price: variant.price,
        quantity: item.quantity,
      });
    }
    const orderId = Math.floor(100000 + Math.random() * 900000);

    const order = new Order({
      email,
      orderId,
      products: fullProducts,
      address,
      amount,
      status: "pending",
    });
    await order.save();
    return NextResponse.json(
      { success: true, message: "Order placed successfully", orderId },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
