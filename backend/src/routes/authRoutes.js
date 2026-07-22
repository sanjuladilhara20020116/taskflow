import express from "express";
import {
  getCurrentUser,
  login,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { loginRules } from "../validators/authValidators.js";

const router = express.Router();

// Public login route.
router.post(
  "/login",
  loginRules,
  validateRequest,
  login
);

// Private route for checking the logged-in user.
router.get("/me", protect, getCurrentUser);

export default router;