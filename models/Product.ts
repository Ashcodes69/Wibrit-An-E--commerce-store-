import mongoose, { Schema, Document, model } from "mongoose";

export interface IProduct extends Document {
  title: string;
  slug: string;
  desc: string;
  img: string;
  category: string;
  size: string;
  color: string;
  price: number;
  avalableQuantity: number;
}
const ProductSchema: Schema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    slug:{type: String, required: true, unique:true},
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    size: { type: String},
    color: { type: String},
    price: { type: Number, required: true },
     avalableQuantity: { type: Number, required: true },
  },
  { timestamps: true }
);
export default mongoose.models.Product || model<IProduct>("Product", ProductSchema);
