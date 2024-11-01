// server/middleware/auth.js
import jwt from 'jsonwebtoken';
import { pool } from '../config/database.js';

export const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        console.log('Auth Header:', authHeader); // Debug log
        
        const token = authHeader && authHeader.split(' ')[1];
        console.log('Token:', token); // Debug log

        if (!token) {
            console.log('No token provided'); // Debug log
            return res.status(403).json({ error: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            console.log('Decoded token:', decoded); // Debug log
            
            const result = await pool.query(
                'SELECT id, username, email FROM users WHERE id = $1',
                [decoded.id]
            );

            if (result.rows.length === 0) {
                console.log('User not found for id:', decoded.id); // Debug log
                return res.status(403).json({ error: 'User not found' });
            }

            req.user = result.rows[0];
            next();
        } catch (jwtError) {
            console.log('JWT verification error:', jwtError); // Debug log
            return res.status(403).json({ error: 'Invalid token' });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(403).json({ error: 'Authentication failed' });
    }
};

export default authenticateToken;