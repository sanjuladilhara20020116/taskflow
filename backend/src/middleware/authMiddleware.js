import jwt from "jsonwebtoken";
import pool from "../config/database.js";

// Protect private routes using a JWT token.
export const protect = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (
      !authorizationHeader ||
      !authorizationHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is missing.",
      });
    }

    // Read the token after the word Bearer.
    const token = authorizationHeader.split(" ")[1];

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const [users] = await pool.execute(
      `
        SELECT id, name, email
        FROM users
        WHERE id = ?
        LIMIT 1
      `,
      [decodedToken.userId]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "The authenticated user no longer exists.",
      });
    }

    // Store the user so controllers can use the user ID.
    req.user = users[0];

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Your login session is invalid or expired.",
    });
  }
};