import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import pool from "../config/database.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    const adminName =
      process.env.ADMIN_NAME || "System Administrator";

    const adminEmail =
      process.env.ADMIN_EMAIL || "admin@test.com";

    const adminPassword =
      process.env.ADMIN_PASSWORD || "123456";

    // Hash the password before storing it.
    const hashedPassword = await bcrypt.hash(
      adminPassword,
      12
    );

    // Create the admin or update it when it already exists.
    await pool.execute(
      `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          password = VALUES(password)
      `,
      [adminName, adminEmail, hashedPassword]
    );

    console.log("Default administrator created successfully");
    console.log(`Admin email: ${adminEmail}`);
  } catch (error) {
    console.error("Admin seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

seedAdmin();