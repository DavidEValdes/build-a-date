// /server/controllers/dateIdeas.js
import { pool } from '../config/database.js';
import { fetchImageUrl } from '../helpers/pexels.js';

const DateIdeasController = {
  // Also update the getDateIdeas method to include is_saved
getDateIdeas: async (req, res) => {
    try {
        const { location, budget, activity_type } = req.query;
        const userId = req.user?.id;

        let query = `
            SELECT d.*, 
                COUNT(DISTINCT l.id) as likes_count,
                COUNT(DISTINCT c.id) as comments_count,
                EXISTS (
                    SELECT 1 FROM saved_dates sd 
                    WHERE sd.date_idea_id = d.id 
                    AND sd.user_id = $1
                ) as is_saved
            FROM date_ideas d
            LEFT JOIN likes l ON d.id = l.date_idea_id
            LEFT JOIN comments c ON d.id = c.date_idea_id
            WHERE d.is_shared = TRUE
        `;
        
        const values = [userId || null];
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
        console.error('Error getting date ideas:', error);
        res.status(500).json({ error: error.message });
    }
},

  // Update only the getDateIdea method in your DateIdeasController
getDateIdea: async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        const dateQuery = await pool.query(
            `SELECT d.*, 
                COUNT(DISTINCT l.id) as likes_count,
                COUNT(DISTINCT c.id) as comments_count,
                u.username as creator_name,
                EXISTS (
                    SELECT 1 FROM saved_dates sd 
                    WHERE sd.date_idea_id = d.id 
                    AND sd.user_id = $1
                ) as is_saved
            FROM date_ideas d
            LEFT JOIN likes l ON d.id = l.date_idea_id
            LEFT JOIN comments c ON d.id = c.date_idea_id
            LEFT JOIN users u ON d.creator_id = u.id
            WHERE d.id = $2
            GROUP BY d.id, u.username`,
            [userId || null, id]
        );

        if (dateQuery.rows.length === 0) {
            return res.status(404).json({ error: 'Date idea not found' });
        }

        let dateIdea = dateQuery.rows[0];

        // Check if image_url is a placeholder
        if (
            !dateIdea.image_url ||
            dateIdea.image_url.startsWith('/api/placeholder')
        ) {
            // Define search query based on activity_type and mood
            const searchQuery = `${dateIdea.activity_type} ${dateIdea.mood}`.trim();

            // Fetch image URL from Pexels
            const imageUrl = await fetchImageUrl(searchQuery);

            if (imageUrl) {
                // Update the database with the new image URL
                await pool.query(
                    'UPDATE date_ideas SET image_url = $1 WHERE id = $2',
                    [imageUrl, dateIdea.id]
                );

                // Update the dateIdea object
                dateIdea.image_url = imageUrl;
            } else {
                // If fetching from Pexels fails, retain the placeholder or set to a default image
                dateIdea.image_url = 'https://via.placeholder.com/400x300?text=No+Image+Available';
            }
        }

        res.json(dateIdea);
    } catch (error) {
        console.error('Error getting date idea:', error);
        res.status(500).json({ error: error.message });
    }
},

  // Also update the createDateIdea method to properly set is_shared
  createDateIdea: async (req, res) => {
    try {
        const {
            title,
            description,
            location,
            cost_category,
            duration,
            activity_type,
            mood,
            time_of_day,
            distance,
            importance,
            activity_level,
            image_url,
        } = req.body;

        const results = await pool.query(
            `INSERT INTO date_ideas 
            (title, description, location, cost_category, duration, 
            activity_type, mood, time_of_day, distance, importance, 
            activity_level, image_url, is_shared, creator_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            RETURNING *`,
            [
                title,
                description,
                location,
                cost_category,
                duration,
                activity_type,
                mood,
                time_of_day,
                distance,
                importance,
                activity_level,
                image_url,
                true, // Set is_shared to true when creating through the API
                null // You can add user ID here when authentication is implemented
            ]
        );

        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  },

  // Update date idea
  updateDateIdea: async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, location, cost_category, duration, activity_type, image_url } = req.body
        
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
            [title, description, location, cost_category, duration, activity_type, image_url, id, req.user.id]
        )

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Date idea not found or unauthorized' })
        }

        res.json(results.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
  },

  // Make sure getAllDateIdeas also includes counts
  getAllDateIdeas: async (req, res) => {
    try {
        const userId = req.user?.id;
        const query = `
            SELECT d.*, 
                COUNT(DISTINCT l.id) as likes_count,
                COUNT(DISTINCT c.id) as comments_count,
                EXISTS (
                    SELECT 1 FROM saved_dates sd 
                    WHERE sd.date_idea_id = d.id 
                    AND sd.user_id = $1
                ) as is_saved
            FROM date_ideas d
            LEFT JOIN likes l ON d.id = l.date_idea_id
            LEFT JOIN comments c ON d.id = c.date_idea_id
            GROUP BY d.id
            ORDER BY d.created_at DESC
        `;
        const results = await pool.query(query, [userId || null]);
        res.json(results.rows);
    } catch (error) {
        console.error('Error getting all date ideas:', error);
        res.status(500).json({ error: error.message });
    }
  },

  // Delete date idea
  deleteDateIdea: async (req, res) => {
    try {
        const { id } = req.params
        
        const results = await pool.query(
            'DELETE FROM date_ideas WHERE id = $1 AND creator_id = $2 RETURNING *',
            [id, req.user.id]
        )

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Date idea not found or unauthorized' })
        }

        res.json({ message: 'Date idea deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
  },

  // Like a date idea
  likeDateIdea: async (req, res) => {
    try {
        const { id } = req.params;
        
        // First verify the date idea exists
        const dateExists = await pool.query(
            'SELECT id FROM date_ideas WHERE id = $1',
            [id]
        );

        if (dateExists.rows.length === 0) {
            return res.status(404).json({ error: 'Date idea not found' });
        }

        // Add the like
        const results = await pool.query(
            'INSERT INTO likes (date_idea_id) VALUES ($1) RETURNING *',
            [id]
        );

        // Get updated like count
        const likeCount = await pool.query(
            'SELECT COUNT(*) as likes_count FROM likes WHERE date_idea_id = $1',
            [id]
        );

        res.status(201).json({
            message: 'Date idea liked successfully',
            like: results.rows[0],
            likes_count: parseInt(likeCount.rows[0].likes_count)
        });
    } catch (error) {
        console.error('Error liking date idea:', error);
        res.status(500).json({ error: error.message });
    }
  },

  // Unlike a date idea
  unlikeDateIdea: async (req, res) => {
    try {
        const { id } = req.params
        await pool.query(
            'DELETE FROM likes WHERE user_id = $1 AND date_idea_id = $2',
            [req.user.id, id]
        )
        res.json({ message: 'Date like removed successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
  },

  // Get like count for a date idea
  getLikes: async (req, res) => {
    try {
        const { id } = req.params;
        const results = await pool.query(
            'SELECT COUNT(*) as count FROM likes WHERE date_idea_id = $1',
            [id]
        );
        res.json({ likes_count: parseInt(results.rows[0].count) });
    } catch (error) {
        console.error('Error getting likes:', error);
        res.status(500).json({ error: error.message });
    }
  },

  // Get comments for a date idea
  getComments: async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Getting comments for date idea:', id); // Debug log
        
        const results = await pool.query(
            'SELECT * FROM comments WHERE date_idea_id = $1 ORDER BY created_at DESC',
            [id]
        );

        res.json(results.rows);
    } catch (error) {
        console.error('Error getting comments:', error);
        res.status(500).json({ error: error.message });
    }
  },

  // Add comment to date idea
  addComment: async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        
        console.log('Adding comment to date idea:', id, 'Content:', content); // Debug log

        if (!content) {
            return res.status(400).json({ error: 'Comment content is required' });
        }

        const results = await pool.query(
            'INSERT INTO comments (date_idea_id, content) VALUES ($1, $2) RETURNING *',
            [id, content]
        );

        res.status(201).json(results.rows[0]);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: error.message });
    }
  }
}

export default DateIdeasController;