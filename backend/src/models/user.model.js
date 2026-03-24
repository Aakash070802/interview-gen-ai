import bcrypt from "bcryptjs";
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
/* HOOKS */
/**
 * @Hook Password hashing method
 */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

/**
 * @Hook Hashed Password comparing method
 */
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

export default User;
