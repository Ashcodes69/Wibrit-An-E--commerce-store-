import mongoose, { Schema, Document, model } from "mongoose";

export interface IUserProfile extends Document {
  name: string;
  email: string;
  address:string;
  phone:number;
  pincode:number;
  city:string;
  state:string;
}
const UserProfileSchema: Schema = new Schema<IUserProfile>(
  {
    name: { type: String, required: true },
    email:{type: String, required: true, unique:true},
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    pincode: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
   
  },
  { timestamps: true }
);
// export default mongoose.models.User || model<IUserProfile>("UserProfile", UserProfileSchema);
export default mongoose.models.UserProfile || mongoose.model<IUserProfile>("UserProfile", UserProfileSchema);
