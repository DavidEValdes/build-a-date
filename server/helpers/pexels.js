// /server/helpers/pexels.js
import axios from "axios";
import { pool } from "../config/database.js";

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const PEXELS_BASE_URL = "https://api.pexels.com/v1/search";

// Initialize cache table if it doesn't exist
const initializeCache = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS image_cache (
        search_term VARCHAR(255) PRIMARY KEY,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Image cache table initialized successfully");
  } catch (error) {
    console.error("Error initializing image cache table:", error);
  }
};

// Clean up old cache entries (optional, can be run periodically)
const cleanupCache = async () => {
  try {
    // Remove entries not accessed in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    await pool.query(
      "DELETE FROM image_cache WHERE last_accessed < $1",
      [thirtyDaysAgo]
    );
  } catch (error) {
    console.error("Error cleaning up cache:", error);
  }
};

// Update last accessed timestamp
const updateLastAccessed = async (searchTerm) => {
  try {
    await pool.query(
      "UPDATE image_cache SET last_accessed = CURRENT_TIMESTAMP WHERE search_term = $1",
      [searchTerm]
    );
  } catch (error) {
    console.error("Error updating last_accessed:", error);
  }
};

// Main image fetching function
export const fetchImageUrl = async (title, retryCount = 0) => {
  try {
    // Initialize cache table if needed
    await initializeCache();

    // Clean and standardize the search term
    const searchTerm = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' '); // Normalize spaces

    // Check cache first
    const cachedResult = await pool.query(
      "SELECT image_url FROM image_cache WHERE search_term = $1",
      [searchTerm]
    );

    if (cachedResult.rows.length > 0) {
      // Update last accessed time
      await updateLastAccessed(searchTerm);
      return cachedResult.rows[0].image_url;
    }

    // If not in cache, fetch from Pexels
    const response = await axios.get(PEXELS_BASE_URL, {
      headers: {
        Authorization: PEXELS_API_KEY
      },
      params: {
        query: searchTerm,
        orientation: "landscape",
        per_page: 1,
        size: "large",
        locale: "en-US"
      }
    });

    let imageUrl = "/api/placeholder/400/300"; // Default fallback

    if (response.data.photos && response.data.photos.length > 0) {
      imageUrl = response.data.photos[0].src.large2x;
    } else if (retryCount === 0) {
      // If no results found, try one more time with a simplified search
      const simplifiedTitle = title
        .toLowerCase()
        .replace(/a |the |and |or |at |in |on |to /g, ' ')
        .trim();
      return fetchImageUrl(simplifiedTitle, 1);
    }

    // Cache the result
    await pool.query(
      `INSERT INTO image_cache (search_term, image_url) 
       VALUES ($1, $2) 
       ON CONFLICT (search_term) 
       DO UPDATE SET 
         image_url = $2,
         last_accessed = CURRENT_TIMESTAMP`,
      [searchTerm, imageUrl]
    );

    return imageUrl;

  } catch (error) {
    console.error("Error in fetchImageUrl:", error.message);

    // Handle specific error cases
    if (error.response?.status === 429) {
      console.error("Rate limit exceeded with Pexels API");
      return "/api/placeholder/400/300";
    }

    if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
      console.error("Connection timeout while fetching image");
      return "/api/placeholder/400/300";
    }

    // For database errors, still try to return a usable image
    if (error.code === "23505") { // Unique violation
      try {
        const result = await pool.query(
          "SELECT image_url FROM image_cache WHERE search_term = $1",
          [title.toLowerCase().trim()]
        );
        if (result.rows.length > 0) {
          return result.rows[0].image_url;
        }
      } catch (dbError) {
        console.error("Error retrieving from cache after conflict:", dbError);
      }
    }

    // Final fallback
    return "/api/placeholder/400/300";
  }
};

// Optional: Export cleanup function for use in maintenance scripts
export const cleanImageCache = cleanupCache;

// Optional: Function to manually refresh a cached image
export const refreshImageCache = async (searchTerm) => {
  try {
    await pool.query(
      "DELETE FROM image_cache WHERE search_term = $1",
      [searchTerm.toLowerCase().trim()]
    );
    return await fetchImageUrl(searchTerm);
  } catch (error) {
    console.error("Error refreshing image cache:", error);
    return "/api/placeholder/400/300";
  }
};

// Optional: Function to get cache statistics
export const getCacheStats = async () => {
  try {
    const stats = await pool.query(`
      SELECT 
        COUNT(*) as total_entries,
        MIN(created_at) as oldest_entry,
        MAX(created_at) as newest_entry,
        COUNT(CASE WHEN image_url LIKE '/api/placeholder%' THEN 1 END) as placeholder_count
      FROM image_cache
    `);
    return stats.rows[0];
  } catch (error) {
    console.error("Error getting cache stats:", error);
    return null;
  }
};