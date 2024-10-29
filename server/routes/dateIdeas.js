// server/routes/dateIdeas.js
import express from 'express';
import DateIdeasController from '../controllers/dateIdeas.js';

const router = express.Router();

// Define the '/all' route first
router.get('/all', DateIdeasController.getAllDateIdeas);

// Other routes
router.get('/', DateIdeasController.getDateIdeas);
router.post('/', DateIdeasController.createDateIdea);

// Place the '/:id' route after more specific routes
router.get('/:id', DateIdeasController.getDateIdea);
router.patch('/:id', DateIdeasController.updateDateIdea);
router.delete('/:id', DateIdeasController.deleteDateIdea);
router.post('/:id/like', DateIdeasController.likeDateIdea);
router.post('/:id/unlike', DateIdeasController.unlikeDateIdea);
router.post('/:id/comment', DateIdeasController.addComment);
router.get('/:id/comments', DateIdeasController.getComments);

export default router;
