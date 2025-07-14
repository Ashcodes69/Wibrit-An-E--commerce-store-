import mongoose, { Schema, Document, model } from "mongoose";

export interface IPincode extends Document {
  code: string;
  city: string;
  state: string;
  isActive: boolean;
}

const PincodeSchema = new Schema<IPincode>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^\d{6}$/,
    },
    city: { type: String, required: true },
    state: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.Pincode ||
  model<IPincode>("Pincode", PincodeSchema);
