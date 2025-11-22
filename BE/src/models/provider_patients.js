import mongoose from "mongoose";

const providerPatientSchema = new mongoose.Schema(
  {
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true, collection: "provider_patients" }
);

export default mongoose.model("ProviderPatient", providerPatientSchema);
