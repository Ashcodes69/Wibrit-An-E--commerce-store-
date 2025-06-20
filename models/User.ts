import mongoose, { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  Name: string;
  email: string;
  password: string;
}
const UserSchema: Schema = new Schema<IUser>(
  {
    Name: { type: String, required: true },
    email:{type: String, required: true, unique:true},
    password: { type: String, required: true },
  },
  { timestamps: true }
);
export default mongoose.models.User || model<IUser>("User", UserSchema);
