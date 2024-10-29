// server/controllers/users.js
import { pool } from '../config/database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const UsersController = {
    // Register new user
    registerUser: async (req, res) => {
        try {
            const { username, email, password } = req.body
            
            // Hash password
            const salt = await bcrypt.genSalt(10)
            const password_hash = await bcrypt.hash(password, salt)
            
            // Create user
            const userResult = await pool.query(
                'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
                [username, email, password_hash]
            )
            
            // Create default preferences
            await pool.query(
                'INSERT INTO user_preferences (user_id) VALUES ($1)',
                [userResult.rows[0].id]
            )
            
            // Generate JWT
            const token = jwt.sign(
                { id: userResult.rows[0].id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            )
            
            res.status(201).json({
                user: userResult.rows[0],
                token
            })
        } catch (error) {
            if (error.code === '23505') { // Unique violation
                res.status(400).json({ error: 'Username or email already exists' })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    },

    // Login user
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body
            
            const results = await pool.query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            )
            
            if (results.rows.length === 0) {
                return res.status(401).json({ error: 'Invalid credentials' })
            }
            
            const user = results.rows[0]
            const validPassword = await bcrypt.compare(password, user.password_hash)
            
            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid credentials' })
            }
            
            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            )
            
            res.json({
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                },
                token
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    // Get user profile with preferences
    getUserProfile: async (req, res) => {
        try {
            const results = await pool.query(
                `SELECT u.id, u.username, u.email, 
                    p.preferred_location, p.preferred_budget, p.preferred_activity_type
                FROM users u
                LEFT JOIN user_preferences p ON u.id = p.user_id
                WHERE u.id = $1`,
                [req.user.id]
            )
            
            res.json(results.rows[0])
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    // Update user preferences
    updatePreferences: async (req, res) => {
        try {
            const { preferred_location, preferred_budget, preferred_activity_type } = req.body
            
            const results = await pool.query(
                `UPDATE user_preferences
                SET preferred_location = COALESCE($1, preferred_location),
                    preferred_budget = COALESCE($2, preferred_budget),
                    preferred_activity_type = COALESCE($3, preferred_activity_type)
                WHERE user_id = $4
                RETURNING *`,
                [preferred_location, preferred_budget, preferred_activity_type, req.user.id]
            )
            
            res.json(results.rows[0])
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    // Get user's created date ideas
    getUserDateIdeas: async (req, res) => {
        try {
            const results = await pool.query(
                `SELECT d.*, COUNT(l.id) as likes_count
                FROM date_ideas d
                LEFT JOIN likes l ON d.id = l.date_idea_id
                WHERE d.creator_id = $1
                GROUP BY d.id
                ORDER BY d.created_at DESC`,
                [req.user.id]
            )
            
            res.json(results.rows)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

export default UsersController