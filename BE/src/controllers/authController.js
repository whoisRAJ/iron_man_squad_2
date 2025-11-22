
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import ProviderPatient from "../models/provider_patients.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role, consentGiven, dateOfBirth } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      role,
      consentGiven,
      dateOfBirth,
      password: passwordHash
    });

    // If the new user is a user, assign a random provider
    if (user.role === "user") {
      // Find all providers
      const providers = await User.find({ role: "provider" });
      if (providers.length > 0) {
        // Pick a random provider
        const randomProvider = providers[Math.floor(Math.random() * providers.length)];
        // Create mapping in provider_patients
        await ProviderPatient.create({
          providerId: randomProvider._id,
          patientId: user._id
        });
      }
    }

    res.status(201).json({
      role: user.role,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid password" });

  let providerDetails = null;
  if (user.role === "user") {
    // Find the provider mapping
    const mapping = await ProviderPatient.findOne({ patientId: user._id }).populate("providerId");
    if (mapping && mapping.providerId) {
      providerDetails = {
        _id: mapping.providerId._id,
        name: mapping.providerId.name,
        email: mapping.providerId.email,
      };
    }
  }

  res.json({
    token: generateToken(user),
    role: user.role,
    name: user.name,
    email: user.email,
    provider: providerDetails
  });
};