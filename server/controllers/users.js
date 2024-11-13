// server/controllers/users.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/database.js";

const UsersController = {
  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);

      // Create user
      const userResult = await pool.query(
        "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email",
        [username, email, password_hash],
      );

      // Generate JWT
      const token = jwt.sign(
        { id: userResult.rows[0].id },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "24h" },
      );

      res.status(201).json({
        user: userResult.rows[0],
        token,
      });
    } catch (error) {
      console.error("Registration error:", error);
      if (error.code === "23505") {
        // Unique violation
        res.status(400).json({ error: "Username or email already exists" });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  loginUser: async (req, res) => {
    const { identifier, password } = req.body;

    try {
      // Check if identifier is an email
      const isEmail = /\S+@\S+\.\S+/.test(identifier);
      let userQuery, userParams;

      if (isEmail) {
        userQuery = "SELECT * FROM users WHERE email = $1";
        userParams = [identifier];
      } else {
        userQuery = "SELECT * FROM users WHERE username = $1";
        userParams = [identifier];
      }

      const result = await pool.query(userQuery, userParams);

      if (result.rows.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const user = result.rows[0];
      const validPassword = await bcrypt.compare(password, user.password_hash);

      if (!validPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "24h" },
      );

      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const { username, email, currentPassword } = req.body;
      const userId = req.user.id;

      // First verify the current password
      const userResult = await pool.query(
        "SELECT password_hash FROM users WHERE id = $1",
        [userId],
      );

      if (!userResult.rows.length) {
        return res.status(404).json({ error: "User not found" });
      }

      const validPassword = await bcrypt.compare(
        currentPassword,
        userResult.rows[0].password_hash,
      );

      if (!validPassword) {
        return res.status(401).json({ error: "Current password is incorrect" });
      }

      // Update the user profile
      const result = await pool.query(
        `UPDATE users 
            SET username = COALESCE($1, username),
                email = COALESCE($2, email)
            WHERE id = $3
            RETURNING id, username, email`,
        [username, email, userId],
      );

      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.code === "23505") {
        // Unique violation
        res.status(400).json({ error: "Username or email already exists" });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  getUserProfile: async (req, res) => {
    try {
      const results = await pool.query(
        "SELECT id, username, email, created_at FROM users WHERE id = $1",
        [req.user.id],
      );
      res.json(results.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getSavedDates: async (req, res) => {
    try {
      const results = await pool.query(
        `SELECT d.*,
                    COUNT(DISTINCT l.id) as likes_count,
                    COUNT(DISTINCT c.id) as comments_count,
                    TRUE as is_saved
                FROM date_ideas d
                LEFT JOIN likes l ON d.id = l.date_idea_id
                LEFT JOIN comments c ON d.id = c.date_idea_id
                INNER JOIN saved_dates sd ON d.id = sd.date_idea_id
                WHERE sd.user_id = $1
                GROUP BY d.id`,
        [req.user.id],
      );
      res.json(results.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  saveDateIdea: async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Saving date idea:", id, "for user:", req.user.id); // Debug log

      // First check if date exists
      const dateExists = await pool.query(
        "SELECT id FROM date_ideas WHERE id = $1",
        [id],
      );

      if (dateExists.rows.length === 0) {
        return res.status(404).json({ error: "Date idea not found" });
      }

      // Check if already saved
      const alreadySaved = await pool.query(
        "SELECT id FROM saved_dates WHERE user_id = $1 AND date_idea_id = $2",
        [req.user.id, id],
      );

      if (alreadySaved.rows.length > 0) {
        return res.status(400).json({ error: "Date already saved" });
      }

      // Save the date
      await pool.query(
        "INSERT INTO saved_dates (user_id, date_idea_id) VALUES ($1, $2)",
        [req.user.id, id],
      );

      res.json({ message: "Date idea saved successfully" });
    } catch (error) {
      console.error("Error saving date:", error);
      res.status(500).json({ error: error.message });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { username, email, currentPassword } = req.body;
      const userId = req.user.id;

      // First verify the current password
      const userResult = await pool.query(
        "SELECT password_hash FROM users WHERE id = $1",
        [userId],
      );

      if (!userResult.rows.length) {
        return res.status(404).json({ error: "User not found" });
      }

      const validPassword = await bcrypt.compare(
        currentPassword,
        userResult.rows[0].password_hash,
      );

      if (!validPassword) {
        return res.status(401).json({ error: "Current password is incorrect" });
      }

      // Update the user profile
      const result = await pool.query(
        `UPDATE users 
                SET username = COALESCE($1, username),
                    email = COALESCE($2, email)
                WHERE id = $3
                RETURNING id, username, email`,
        [username, email, userId],
      );

      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.code === "23505") {
        // Unique violation
        res.status(400).json({ error: "Username or email already exists" });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user.id;

      // First verify the current password
      const userResult = await pool.query(
        "SELECT password_hash FROM users WHERE id = $1",
        [userId],
      );

      if (!userResult.rows.length) {
        return res.status(404).json({ error: "User not found" });
      }

      const validPassword = await bcrypt.compare(
        currentPassword,
        userResult.rows[0].password_hash,
      );

      if (!validPassword) {
        return res.status(401).json({ error: "Current password is incorrect" });
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const newPasswordHash = await bcrypt.hash(newPassword, salt);

      // Update the password
      await pool.query("UPDATE users SET password_hash = $1 WHERE id = $2", [
        newPasswordHash,
        userId,
      ]);

      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ error: error.message });
    }
  },

  unsaveDateIdea: async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Unsaving date idea:", id, "for user:", req.user.id); // Debug log

      const result = await pool.query(
        "DELETE FROM saved_dates WHERE user_id = $1 AND date_idea_id = $2 RETURNING id",
        [req.user.id, id],
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Date was not saved" });
      }

      res.json({ message: "Date idea unsaved successfully" });
    } catch (error) {
      console.error("Error unsaving date:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

export default UsersController;
