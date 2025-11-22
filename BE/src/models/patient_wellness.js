import mongoose from "mongoose";

const patientWellnessSchema = new mongoose.Schema(
  {
    // _id will be auto-generated unless you want to use custom string ids
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    steps: { type: Number },
    sleepHours: { type: Number },
    BP: { type: Number },
    status: { type: String },
  },
  { timestamps: true, collection: "patient_wellness" }
);

export default mongoose.model("PatientWellness", patientWellnessSchema);
