import PatientWellness from "../models/patient_wellness.js";
// Fetch patient wellness details for a user for a week or a specific date
export const getPatientWellness = async (req, res) => {
  try {
    const { email } = req.query;
    const { date, weekStart, weekEnd } = req.query;

    if (!email) return res.status(400).json({ error: "Email is required" });

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    let query = { userId: user._id };
    if (date) {
      // For a particular date
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      query.date = { $gte: start, $lte: end };
    } else if (weekStart && weekEnd) {
      // For a week range
      query.date = {
        $gte: new Date(weekStart),
        $lte: new Date(weekEnd)
      };
    }

    const wellness = await PatientWellness.find(query);
    res.json(wellness);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, height, weight, dob } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "User already exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      height,
      weight,
      dob,
    });

    res.json({ msg: "User registered", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ msg: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};