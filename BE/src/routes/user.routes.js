
import express from "express";
import { register, login, getPatientWellness } from "../controllers/user.controller.js";

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
// GET /api/user/wellness?email=...&date=YYYY-MM-DD or &weekStart=YYYY-MM-DD&weekEnd=YYYY-MM-DD
router.get("/wellness", getPatientWellness);

export default router;