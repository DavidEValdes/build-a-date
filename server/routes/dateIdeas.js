// server/routes/dateIdeas.js
import express from 'express';
import DateIdeasController from '../controllers/dateIdeas.js';

const router = express.Router();

// Date idea routes
router.get('/all', DateIdeasController.getAllDateIdeas);
router.get('/', DateIdeasController.getDateIdeas);
router.post('/', DateIdeasController.createDateIdea);
router.get('/:id', DateIdeasController.getDateIdea);
router.patch('/:id', DateIdeasController.updateDateIdea);
router.delete('/:id', DateIdeasController.deleteDateIdea);

// Like routes
router.post('/:id/like', DateIdeasController.likeDateIdea);
router.post('/:id/unlike', DateIdeasController.unlikeDateIdea);

// Comment routes
router.get('/:id/comments', DateIdeasController.getComments);
router.post('/:id/comment', DateIdeasController.addComment);  

export default router;
