// server/routes/dateIdeas.js
import express from 'express';
import DateIdeasController from '../controllers/dateIdeas.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Date idea routes - Add optional auth middleware
router.get('/all', authenticateToken, DateIdeasController.getAllDateIdeas);
router.get('/', authenticateToken, DateIdeasController.getDateIdeas);
router.post('/', DateIdeasController.createDateIdea);
router.get('/:id', authenticateToken, DateIdeasController.getDateIdea);
router.patch('/:id', authenticateToken, DateIdeasController.updateDateIdea);
router.delete('/:id', authenticateToken, DateIdeasController.deleteDateIdea);

// Like routes
router.post('/:id/like', authenticateToken, DateIdeasController.likeDateIdea);
router.post('/:id/unlike', authenticateToken, DateIdeasController.unlikeDateIdea);

// Comment routes
router.get('/:id/comments', DateIdeasController.getComments);
router.post('/:id/comment', authenticateToken, DateIdeasController.addComment);  

export default router;