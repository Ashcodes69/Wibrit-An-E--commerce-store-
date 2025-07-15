import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

export const POST = async (req: Request) => {
  await connectDb();
  const body = await req.json();
  try {
    for (let i = 0; i < body.length; i++) {
      const { title, slug, desc, img, category, variants } = body[i];
       const filteredVariants = variants.filter(
        (variant: { quantity: number }) => variant.quantity > 0
      );
      const p = new Product({
        title,
        slug,
        desc,
        img,
        category,
        variants : filteredVariants, 
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
