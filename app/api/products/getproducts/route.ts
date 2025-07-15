import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

export const GET = async (req: Request) => {
  await connectDb();
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const slug = searchParams.get("slug");
    let products;
    if (slug) {
      products = await Product.findOne({ slug: slug });
      if (!products) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(products, { status: 200 });
    }
    if (category) {
      products = await Product.find({ category: new RegExp(category, "i") });
    } else {
      products = await Product.find();
    }
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
