// /server/helpers/pexels.js
import axios from 'axios';

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const PEXELS_BASE_URL = 'https://api.pexels.com/v1/search';

/**
 * Fetches a relevant image URL from Pexels based on the date idea title.
 * @param {string} title - The title of the date idea (e.g., "Sunrise Hike").
 * @returns {string|null} - The URL of the fetched image or null if none found.
 */
export const fetchImageUrl = async (title) => {
  try {
    const response = await axios.get(PEXELS_BASE_URL, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
      params: {
        query: title,        // Use the title directly as the search query
        per_page: 15,        // Fetch more to increase randomness
        orientation: 'landscape',
      },
    });

    const photos = response.data.photos;

    if (photos.length === 0) {
      console.warn(`No photos found for title: "${title}"`);
      return null;
    }

    // Select a random photo from the results
    const randomIndex = Math.floor(Math.random() * photos.length);
    const selectedPhoto = photos[randomIndex];

    return selectedPhoto.src.large2x; // Choose the desired size
  } catch (error) {
    console.error('Error fetching image from Pexels:', error.message);
    return null;
  }
};