import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

export const POST = async (req: Request) => {
  await connectDb();
  const body = await req.json();
  try {
    for (let i = 0; i < body.length; i++) {
      const p = new Product({
        title: body[i].title,
        slug: body[i].slug,
        desc: body[i].desc,
        img: body[i].img,
        category: body[i].category,
        size: body[i].size,
        color: body[i].color,
        price: body[i].price,
        availableQuantity: body[i].availableQuantity,
      });     
      await p.save();
    }
    return NextResponse.json(
      { sucess: true, message: "products added sucessfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { sucess: false, error: "internal server error" },
      { status: 400 }
    );
  }
};
