import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

export const POST = async (req: Request) => {
  await connectDb();
  const body = await req.json();
  try {
    for (let i = 0; i < body.length; i++) {
      const item = body[i]
      if(!item._id) continue;
      await Product.findByIdAndUpdate(item._id,item,{
        new:true,
        runValidators:true
      })  
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
