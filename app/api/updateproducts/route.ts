import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

export const POST = async (req: Request) => {
  await connectDb();
  const body = await req.json();
  try {
    // for (let i = 0; i < body.length; i++) {
    //   const item = body[i]
    //   if(!item._id) continue;
    //   await Product.findByIdAndUpdate(item._id,item,{
    //     new:true,
    //     runValidators:true
    //   })
    for (let i = 0; i < body.length; i++) {
      const item = body[i];
      if (!item._id) continue;

      const product = await Product.findById(item._id);
      if (!product) continue;

      product.title = item.title;
      product.slug = item.slug;
      product.desc = item.desc;
      product.img = item.img;
      product.category = item.category;
       product.set("variants", item.variants); // ✅ force set full variant array

      await product.save(); // ✅ triggers full schema validation and deep update
    }

    return NextResponse.json(
      { sucess: true, message: "products updated sucessfully" },
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
