// server/routes/comments.js
import express from 'express';
import DateIdeasController from '../controllers/dateIdeas.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Update Comment Route
router.put('/:commentId', authenticateToken, DateIdeasController.updateComment);

// Delete Comment Route
router.delete('/:commentId', authenticateToken, DateIdeasController.deleteComment);

// Optionally, you can add more comment-specific routes here



// Comment routes
router.get('/:id/comments', DateIdeasController.getComments);
router.post('/:id/comment', authenticateToken, DateIdeasController.addComment);  
router.delete('/comments/:commentId', authenticateToken, DateIdeasController.deleteComment);

// Update comment route
router.put('/:commentId', authenticateToken, DateIdeasController.updateComment);

// Delete comment route
router.delete('/:commentId', authenticateToken, DateIdeasController.deleteComment);


export default router;