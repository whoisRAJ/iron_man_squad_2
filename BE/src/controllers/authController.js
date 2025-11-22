import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

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

    res.status(201).json({ token: generateToken(user) });
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

  res.json({ token: generateToken(user) });
};