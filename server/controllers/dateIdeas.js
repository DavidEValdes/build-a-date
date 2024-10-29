import { pool } from '../config/database.js'

const DateIdeasController = {
    // Get all date ideas with basic filtering
    getDateIdeas: async (req, res) => {
        try {
            const { location, budget, activity_type } = req.query
            let query = 'SELECT * FROM date_ideas WHERE 1=1'
            const values = []
            
            if (location) {
                values.push(location)
                query += ` AND location = $${values.length}`
            }
            if (budget) {
                values.push(budget)
                query += ` AND cost_category = $${values.length}`
            }
            if (activity_type) {
                values.push(activity_type)
                query += ` AND activity_type = $${values.length}`
            }
            
            query += ' ORDER BY created_at DESC'
            
            const results = await pool.query(query, values)
            res.json(results.rows)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    // Get single date idea with its comments and likes count
    getDateIdea: async (req, res) => {
        try {
            const { id } = req.params
            const dateQuery = await pool.query(
                `SELECT d.*, 
                    COUNT(DISTINCT l.id) as likes_count,
                    COUNT(DISTINCT c.id) as comments_count,
                    u.username as creator_name
                FROM date_ideas d
                LEFT JOIN likes l ON d.id = l.date_idea_id
                LEFT JOIN comments c ON d.id = c.date_idea_id
                LEFT JOIN users u ON d.creator_id = u.id
                WHERE d.id = $1
                GROUP BY d.id, u.username`,
                [id]
            )

            if (dateQuery.rows.length === 0) {
                return res.status(404).json({ error: 'Date idea not found' })
            }

            res.json(dateQuery.rows[0])
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    // Create new date idea
    createDateIdea: async (req, res) => {
        try {
            const { title, description, location, cost_category, duration, activity_type, image_url } = req.body

            const results = await pool.query(
                `INSERT INTO date_ideas 
                (title, description, location, cost_category, duration, activity_type, image_url)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *`,
                [title, description, location, cost_category, duration, activity_type, image_url]
            )

            res.status(201).json(results.rows[0])
        } catch (error) {
            res.status(500).json({ error: error.message })
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
            const { id } = req.params
            await pool.query(
                'INSERT INTO likes (user_id, date_idea_id) VALUES ($1, $2)',
                [req.user.id, id]
            )
            res.json({ message: 'Date idea liked successfully' })
        } catch (error) {
            if (error.code === '23505') { // Unique violation
                res.status(400).json({ error: 'Already liked this date idea' })
            } else {
                res.status(500).json({ error: error.message })
            }
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

    // Add comment to date idea
    addComment: async (req, res) => {
        try {
            const { id } = req.params
            const { content } = req.body
            
            const results = await pool.query(
                'INSERT INTO comments (user_id, date_idea_id, content) VALUES ($1, $2, $3) RETURNING *',
                [req.user.id, id, content]
            )

            res.status(201).json(results.rows[0])
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    // Get comments for a date idea
    getComments: async (req, res) => {
        try {
            const { id } = req.params
            
            const results = await pool.query(
                `SELECT c.*, u.username
                FROM comments c
                JOIN users u ON c.user_id = u.id
                WHERE c.date_idea_id = $1
                ORDER BY c.created_at DESC`,
                [id]
            )

            res.json(results.rows)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

export default DateIdeasController

