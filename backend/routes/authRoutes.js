import express from "express";
import { googleLogin, logout, userProfile } from "../controllers/authController.js";
import { isAuth, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/google-login", googleLogin);
router.get("/logout", logout);

router.get("/user-dashboard", isAuth, userProfile);
router.get("/admin-dashboard", isAuth, isAdmin, userProfile);

export default router;
