import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   firstName: { type: String },
   lastName: { type: String },
   email: { type: String, required: true },
   password: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema);
