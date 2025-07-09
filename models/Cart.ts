import mongoose, { Schema, Document, model } from "mongoose";

export interface ICartProduct {
  productId: string;
  title: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  img: string;
}
export interface ICart extends Document {
  userId: string;
  products: ICartProduct[];
}
const CartProductSchema: Schema = new Schema<ICartProduct>(
  {
    productId: { type: String, required: true },
    title: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    img: { type: String, required: true },
  },
  { _id: false }
);
const CartSchema: Schema = new Schema<ICart>(
  {
    userId: { type: String, required: true, unique: true },
    products: { type: [CartProductSchema], default: [] },
  },
  { timestamps: true }
);
export default mongoose.models.Cart || model<ICart>("Cart", CartSchema);
