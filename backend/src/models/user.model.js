import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: [true, "Username is required"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      trim: true,
      minLength: [6, "Password must be at least 6 characters long"],
      required: [true, "Password is required"],
    },
  },
  { timestamps: true },
);

export const User = model("User", userSchema);
