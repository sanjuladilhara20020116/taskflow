import { validationResult } from "express-validator";

// Return validation errors before the controller runs.
export const validateRequest = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Please correct the validation errors.",
      errors: validationErrors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  next();
};