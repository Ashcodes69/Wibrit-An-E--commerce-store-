import mongoose, { Schema, Document, Model } from "mongoose";

export interface iVariant {
  size: string;
  color: string;
  quantity: number;
  price: number;
}
export interface IProduct extends Document {
  title: string;
  slug: string;
  desc: string;
  img: string;
  category: string;
  variants: iVariant[];
}

const VariantSchema: Schema = new Schema<iVariant>(
  {
    color: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);
const ProductSchema: Schema = new Schema<IProduct>(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    variants: { type: [VariantSchema], required: true },
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
