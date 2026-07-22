import bcrypt from "bcryptjs";
import pool from "../config/database.js";
import { generateToken } from "../utils/generateToken.js";

// Login using email and password.
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const [users] = await pool.execute(
      `
        SELECT id, name, email, password
        FROM users
        WHERE email = ?
        LIMIT 1
      `,
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Email or password is incorrect.",
      });
    }

    const user = users[0];

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Email or password is incorrect.",
      });
    }

    const token = generateToken(user.id);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Return the currently authenticated user.
export const getCurrentUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};