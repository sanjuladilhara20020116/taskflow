import { body } from "express-validator";

// Validate the login request.
export const loginRules = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Enter a valid email address.")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required."),
];