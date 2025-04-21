import mongoose, { Schema, model, Document } from "mongoose";
import { User } from "../../../../entities/User";

const UserSchema = new Schema<User>({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model<User>("User", UserSchema);
