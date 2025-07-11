import mongoose, { Schema, Document, model } from "mongoose";

export interface IOrderedProduct {
  productId: string;
  title: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}
export interface IOrder extends Document {
 email: string;
  products: IOrderedProduct[];
  address: string;
  amount: number;
  status: string;
}

const OrderedProductSchema: Schema = new Schema<IOrderedProduct>(
  {
    productId: { type: String, required: true },
    title: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);
const OrderSchema: Schema = new Schema<IOrder>(
  {
    email: { type: String, required: true },
    products: { type: [OrderedProductSchema], required: true },
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "pending", required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Order || model<IOrder>("Order", OrderSchema);