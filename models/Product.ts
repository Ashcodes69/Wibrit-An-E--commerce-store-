import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  title: string;
  slug: string;
  desc: string;
  img: string;
  category: string;
  size: string[];
  color: string[];
  price: number;
  availableQuantity: number;
}

const ProductSchema: Schema = new Schema<IProduct>(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    size: { type: [String] },
    color: { type: [String] },
    price: { type: Number, required: true },
    availableQuantity: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
