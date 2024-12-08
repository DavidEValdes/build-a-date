// /server/controllers/dateIdeas.js
import { pool } from "../config/database.js";
import { fetchImageUrl } from "../helpers/pexels.js";

const DateIdeasController = {
  // Get Date Ideas
  getDateIdeas: async (req, res) => {
    try {
      const { location, budget, activity_type } = req.query;
      const userId = req.user?.id || null;

      let query = `
                SELECT d.*, 
                    COUNT(DISTINCT l.id) as likes_count,
                    COUNT(DISTINCT c.id) as comments_count,
                    EXISTS (
                        SELECT 1 FROM saved_dates sd 
                        WHERE sd.date_idea_id = d.id 
                        AND sd.user_id = $1
                    ) as is_saved,
                    EXISTS (
                        SELECT 1 FROM likes l2
                        WHERE l2.date_idea_id = d.id
                        AND l2.user_id = $1
                    ) as is_liked
                FROM date_ideas d
                LEFT JOIN likes l ON d.id = l.date_idea_id
                LEFT JOIN comments c ON d.id = c.date_idea_id
                WHERE d.is_shared = TRUE
            `;

      const values = [userId];
      let paramCount = 2; // Start from 2 since we used $1 for userId

      if (location) {
        values.push(location);
        query += ` AND d.location = $${paramCount++}`;
      }
      if (budget) {
        values.push(budget);
        query += ` AND d.cost_category = $${paramCount++}`;
      }
      if (activity_type) {
        values.push(activity_type);
        query += ` AND d.activity_type = $${paramCount++}`;
      }

      query += ` GROUP BY d.id ORDER BY d.created_at DESC`;

      const results = await pool.query(query, values);
      res.json(results.rows);
    } catch (error) {
      console.error("Error getting date ideas:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get Date Idea by ID
  getDateIdea: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user?.id || null;
  
      const dateQuery = await pool.query(
        `SELECT d.*, 
          COUNT(DISTINCT l.id) as likes_count,
          COUNT(DISTINCT c.id) as comments_count,
          u.username as creator_name,
          EXISTS (
            SELECT 1 FROM saved_dates sd 
            WHERE sd.date_idea_id = d.id 
            AND sd.user_id = $1
          ) as is_saved,
          EXISTS (
            SELECT 1 FROM likes l2
            WHERE l2.date_idea_id = d.id
            AND l2.user_id = $1
          ) as is_liked
        FROM date_ideas d
        LEFT JOIN likes l ON d.id = l.date_idea_id
        LEFT JOIN comments c ON d.id = c.date_idea_id
        LEFT JOIN users u ON d.creator_id = u.id
        WHERE d.id = $2
        GROUP BY d.id, u.username`,
        [userId, id],
      );
  
      if (dateQuery.rows.length === 0) {
        return res.status(404).json({ error: "Date idea not found" });
      }
  
      let dateIdea = dateQuery.rows[0];
  
      // Check if image_url is missing or is a placeholder
      if (!dateIdea.image_url || 
          dateIdea.image_url.startsWith("/api/placeholder") || 
          dateIdea.image_url === "https://via.placeholder.com/400x300?text=No+Image+Available") {
        try {
          console.log("Fetching new image for:", dateIdea.title); // Debug log
          const imageUrl = await fetchImageUrl(dateIdea.title);
          console.log("Received image URL:", imageUrl); // Debug log
  
          if (imageUrl && imageUrl !== dateIdea.image_url) {
            // Update the database with the new image URL
            await pool.query(
              "UPDATE date_ideas SET image_url = $1 WHERE id = $2",
              [imageUrl, dateIdea.id]
            );
            dateIdea.image_url = imageUrl;
          }
        } catch (imageError) {
          console.error("Error fetching image:", imageError);
          dateIdea.image_url = "/api/placeholder/400/300";
        }
      }
  
      // Ensure we always have an image URL
      if (!dateIdea.image_url) {
        dateIdea.image_url = "/api/placeholder/400/300";
      }
  
      res.json(dateIdea);
    } catch (error) {
      console.error("Error getting date idea:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Create Date Idea
  createDateIdea: async (req, res) => {
    try {
      const {
        title,
        description,
        location,
        cost_category,
        duration,
        activity_types,
        atmosphere,
        time_of_day,
        interests,
        group_size,
        season,
        activity_level,
        image_url
      } = req.body;
  
      const results = await pool.query(
        `INSERT INTO date_ideas 
          (title, description, location, cost_category, duration, 
          activity_types, atmosphere, time_of_day, interests, group_size, 
          season, activity_level, image_url, is_shared, creator_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
          RETURNING *`,
        [
          title,
          description,
          location,
          cost_category,
          duration,
          activity_types,
          atmosphere,
          time_of_day,
          interests,
          group_size,
          season,
          activity_level,
          image_url || "/api/placeholder/400/300",
          true,
          null,
        ]
      );
  
      res.status(201).json(results.rows[0]);
    } catch (error) {
      console.error("Error creating date idea:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Update Date Idea
  updateDateIdea: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        location,
        cost_category,
        duration,
        activity_type,
        image_url,
      } = req.body;

      const results = await pool.query(
        `UPDATE date_ideas
                SET title = COALESCE($1, title),
                    description = COALESCE($2, description),
                    location = COALESCE($3, location),
                    cost_category = COALESCE($4, cost_category),
                    duration = COALESCE($5, duration),
                    activity_type = COALESCE($6, activity_type),
                    image_url = COALESCE($7, image_url)
                WHERE id = $8 AND creator_id = $9
                RETURNING *`,
        [
          title,
          description,
          location,
          cost_category,
          duration,
          activity_type,
          image_url,
          id,
          req.user.id,
        ],
      );

      if (results.rows.length === 0) {
        return res
          .status(404)
          .json({ error: "Date idea not found or unauthorized" });
      }

      res.json(results.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get All Date Ideas
  getAllDateIdeas: async (req, res) => {
    try {
      const userId = req.user?.id || null;
      const query = `
                SELECT d.*, 
                    COUNT(DISTINCT l.id) as likes_count,
                    COUNT(DISTINCT c.id) as comments_count,
                    EXISTS (
                        SELECT 1 FROM saved_dates sd 
                        WHERE sd.date_idea_id = d.id 
                        AND sd.user_id = $1
                    ) as is_saved,
                    EXISTS (
                        SELECT 1 FROM likes l2
                        WHERE l2.date_idea_id = d.id
                        AND l2.user_id = $1
                    ) as is_liked
                FROM date_ideas d
                LEFT JOIN likes l ON d.id = l.date_idea_id
                LEFT JOIN comments c ON d.id = c.date_idea_id
                GROUP BY d.id
                ORDER BY d.created_at DESC
            `;
      const results = await pool.query(query, [userId]);
      res.json(results.rows);
    } catch (error) {
      console.error("Error getting all date ideas:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Delete Date Idea
  deleteDateIdea: async (req, res) => {
    try {
      const { id } = req.params;

      const results = await pool.query(
        "DELETE FROM date_ideas WHERE id = $1 AND creator_id = $2 RETURNING *",
        [id, req.user.id],
      );

      if (results.rows.length === 0) {
        return res
          .status(404)
          .json({ error: "Date idea not found or unauthorized" });
      }

      res.json({ message: "Date idea deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update Comment Function
  updateComment: async (req, res) => {
    try {
      const userId = req.user.id; // From authenticateToken middleware
      const { commentId } = req.params;
      const { content } = req.body;

      if (!content || content.trim() === "") {
        return res.status(400).json({ error: "Content cannot be empty" });
      }

      // Check if the comment exists and belongs to the user
      const commentResult = await pool.query(
        "SELECT * FROM comments WHERE id = $1 AND user_id = $2",
        [commentId, userId],
      );

      if (commentResult.rows.length === 0) {
        return res
          .status(403)
          .json({ error: "You are not authorized to edit this comment" });
      }

      // Update the comment
      await pool.query("UPDATE comments SET content = $1 WHERE id = $2", [
        content,
        commentId,
      ]);

      res.status(200).json({ message: "Comment updated successfully" });
    } catch (error) {
      console.error("Error updating comment:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Like a Date Idea
  likeDateIdea: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      // First verify the date idea exists
      const dateExists = await pool.query(
        "SELECT id FROM date_ideas WHERE id = $1",
        [id],
      );

      if (dateExists.rows.length === 0) {
        return res.status(404).json({ error: "Date idea not found" });
      }

      // Check if the user has already liked this date idea
      const existingLike = await pool.query(
        "SELECT id FROM likes WHERE user_id = $1 AND date_idea_id = $2",
        [userId, id],
      );

      if (existingLike.rows.length > 0) {
        return res
          .status(400)
          .json({ error: "You have already liked this date idea" });
      }

      // Add the like
      await pool.query(
        "INSERT INTO likes (user_id, date_idea_id) VALUES ($1, $2)",
        [userId, id],
      );

      res.status(201).json({ message: "Date idea liked successfully" });
    } catch (error) {
      console.error("Error liking date idea:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Unlike a Date Idea
  unlikeDateIdea: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const result = await pool.query(
        "DELETE FROM likes WHERE user_id = $1 AND date_idea_id = $2 RETURNING id",
        [userId, id],
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Like not found" });
      }

      res.json({ message: "Date like removed successfully" });
    } catch (error) {
      console.error("Error unliking date idea:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get Like Count for a Date Idea
  getLikes: async (req, res) => {
    try {
      const { id } = req.params;
      const results = await pool.query(
        "SELECT COUNT(*) as count FROM likes WHERE date_idea_id = $1",
        [id],
      );
      res.json({ likes_count: parseInt(results.rows[0].count) });
    } catch (error) {
      console.error("Error getting likes:", error);
      res.status(500).json({ error: error.message });
    }
  },

  getComments: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query(
        `SELECT comments.*, users.username
             FROM comments
             JOIN users ON comments.user_id = users.id
             WHERE comments.date_idea_id = $1
             ORDER BY comments.created_at DESC`,
        [id],
      );
      res.json(result.rows);
    } catch (error) {
      console.error("Error getting comments:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Add Comment to a Date Idea
  addComment: async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { id } = req.params;
      const { content } = req.body;
      const userId = req.user.id;

      const result = await pool.query(
        `INSERT INTO comments (date_idea_id, user_id, content)
             VALUES ($1, $2, $3)
             RETURNING *`,
        [id, userId, content],
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteComment: async (req, res) => {
    try {
      const userId = req.user.id; // From authenticateToken middleware
      const { commentId } = req.params;

      // Check if the comment exists and belongs to the user
      const commentResult = await pool.query(
        "SELECT * FROM comments WHERE id = $1 AND user_id = $2",
        [commentId, userId],
      );

      if (commentResult.rows.length === 0) {
        return res
          .status(403)
          .json({ error: "You are not authorized to delete this comment" });
      }

      // Delete the comment
      await pool.query("DELETE FROM comments WHERE id = $1", [commentId]);

      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default DateIdeasController;
