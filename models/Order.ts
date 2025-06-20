import mongoose, { Schema, Document, model } from "mongoose";

export interface IOrder extends Document {
  userId: string;
  products: {
    productId: string;
    quantity: string;
  }[];
  address: string;
  amount: number;
  status: string;
}
const OrderSchema: Schema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "pending", required: true },
  },
  { timestamps: true }
);
export default mongoose.models.Order || model<IOrder>("Order", OrderSchema);
