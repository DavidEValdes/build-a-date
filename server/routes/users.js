// server/routes/users.js
import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import UsersController from '../controllers/users.js';

const router = express.Router();

// Public routes
router.post('/register', UsersController.registerUser);
router.post('/login', UsersController.loginUser);

// Protected routes (require authentication)
router.get('/profile', authenticateToken, UsersController.getUserProfile);
router.patch('/profile', authenticateToken, UsersController.updateProfile);
router.post('/change-password', authenticateToken, UsersController.changePassword);
router.get('/saved-dates', authenticateToken, UsersController.getSavedDates);
router.post('/dates/:id/save', authenticateToken, UsersController.saveDateIdea);
router.delete('/dates/:id/save', authenticateToken, UsersController.unsaveDateIdea);

export default router;