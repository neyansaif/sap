import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
   name: { type: String, required: true },
   gender: { type: String, required: true },
   placeOfBirth: { type: String, required: true },
   dateOfBirth: { type: Date, required: true },
   groups: { type: [String] },
});

export const Student = mongoose.model("Student", studentSchema);
