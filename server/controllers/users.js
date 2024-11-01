// server/controllers/users.js
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { pool } from '../config/database.js'

const UsersController = {
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

            // Generate JWT
            const token = jwt.sign(
                { id: userResult.rows[0].id },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '24h' }
            )

            res.status(201).json({
                user: userResult.rows[0],
                token
            })
        } catch (error) {
            console.error('Registration error:', error);
            if (error.code === '23505') { // Unique violation
                res.status(400).json({ error: 'Username or email already exists' })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    },

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
                process.env.JWT_SECRET || 'your-secret-key',
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
            console.error('Login error:', error);
            res.status(500).json({ error: error.message })
        }
    },

    getUserProfile: async (req, res) => {
        try {
            const results = await pool.query(
                'SELECT id, username, email, created_at FROM users WHERE id = $1',
                [req.user.id]
            )
            res.json(results.rows[0])
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    getSavedDates: async (req, res) => {
        try {
            const results = await pool.query(
                `SELECT d.* FROM date_ideas d
                INNER JOIN saved_dates s ON d.id = s.date_idea_id
                WHERE s.user_id = $1`,
                [req.user.id]
            )
            res.json(results.rows)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    saveDateIdea: async (req, res) => {
        try {
            const { id } = req.params
            await pool.query(
                'INSERT INTO saved_dates (user_id, date_idea_id) VALUES ($1, $2)',
                [req.user.id, id]
            )
            res.json({ message: 'Date idea saved successfully' })
        } catch (error) {
            if (error.code === '23505') { // Unique violation
                res.status(400).json({ error: 'Date idea already saved' })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    },

    unsaveDateIdea: async (req, res) => {
        try {
            const { id } = req.params
            await pool.query(
                'DELETE FROM saved_dates WHERE user_id = $1 AND date_idea_id = $2',
                [req.user.id, id]
            )
            res.json({ message: 'Date idea removed from saved' })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

export default UsersController