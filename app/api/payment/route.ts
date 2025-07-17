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
    if (
      !email ||
      !address ||
      !amount ||
      !products ||
      !Array.isArray(products)
    ) {
      console.error(" Invalid order payload");
      return NextResponse.json(
        { success: false, message: "Invalid request body" },
        { status: 400 }
      );
    }

    const fullProducts = [];

    for (const item of products) {
      if (!item.productId || !item.size || !item.color || !item.quantity) {
        console.error(" Missing product info in item:", item);
        return NextResponse.json(
          { success: false, message: "Incomplete product data" },
          { status: 400 }
        );
      }

      const dbProduct = await Product.findById(item.productId);
      if (!dbProduct) {
        console.error(" Product not found:", item.productId);
        return NextResponse.json(
          { success: false, message: "Product not found" },
          { status: 404 }
        );
      }

      const variant = dbProduct.variants.find(
        (v) =>
          v.color.toLowerCase() === item.color.toLowerCase() &&
          v.size.toLowerCase() === item.size.toLowerCase()
      );
      if (!variant) {
        console.error(
          " Variant not found for:",
          item.color,
          item.size,
          "in product:",
          dbProduct.title
        );
        return NextResponse.json(
          { success: false, message: "Product variant not found" },
          { status: 400 }
        );
      }
      const outOfStockItems = [];
      for (const item of products) {
        const dbProduct = await Product.findById(item.productId);
        const variant = dbProduct?.variants.find(
          (v) =>
            v.color.match(new RegExp(`^${item.color}$`, "i")) &&
            v.size.match(new RegExp(`^${item.size}$`, "i"))
        );

        if (!variant || variant.quantity < item.quantity) {
          outOfStockItems.push({
            title: dbProduct?.title,
            color: item.color,
            size: item.size,
            avalable: variant?.quantity ?? 0,
            requested: item.quantity,
          });
        }
      }
      console.log(outOfStockItems)
      if (outOfStockItems.length > 0) {
        return NextResponse.json(
          {
            success: false,
            message: "some items are out of stock hehe",
            outOfStockItems,
          },
          { status: 400 }
        );
      }
      fullProducts.push({
        productId: item.productId,
        title: dbProduct.title,
        size: item.size,
        color: item.color,
        price: variant.price,
        quantity: item.quantity,
      });
    }

    const order = new Order({
      email,
      products: fullProducts,
      address,
      amount,
      status: "pending",
    });
    const savedOrder = await order.save();
    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
        orderId: savedOrder._id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ERROR placing order:", error || error);
    return NextResponse.json(
      { success: false, error: error || "Something went wrong" },
      { status: 500 }
    );
  }
}
