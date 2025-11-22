import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date },
    consentGiven: { type: Boolean, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true, collection: "users" }
);
export default mongoose.model("User", userSchema);