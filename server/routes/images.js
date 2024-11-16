import express from 'express';
import { fetchImageUrl } from '../helpers/pexels.js';

const router = express.Router();

router.post('/search', async (req, res) => {
  try {
    const { searchTerms } = req.body;
    
    // Try each search term until we get a valid image
    for (const term of searchTerms) {
      const imageUrl = await fetchImageUrl(term);
      if (imageUrl && !imageUrl.includes("/api/placeholder")) {
        return res.json({ imageUrl });
      }
    }
    
    // If no image found, return placeholder
    return res.json({ imageUrl: '/api/placeholder/400/300' });
  } catch (error) {
    console.error('Error searching for image:', error);
    res.status(500).json({ error: 'Failed to fetch image', imageUrl: '/api/placeholder/400/300' });
  }
});

export default router;