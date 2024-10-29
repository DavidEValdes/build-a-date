// server/config/reset.js
import { pool } from './database.js'
import './dotenv.js'

const resetDatabase = async () => {
    try {
        // Drop existing tables
        await pool.query(`
            DROP TABLE IF EXISTS comments CASCADE;
            DROP TABLE IF EXISTS likes CASCADE;
            DROP TABLE IF EXISTS date_ideas CASCADE;
        `)
        console.log('🗑️  Tables dropped successfully')

        // Create date_ideas table
        await pool.query(`
            CREATE TABLE date_ideas (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                location VARCHAR(100),
                cost_category VARCHAR(50),
                duration VARCHAR(50),
                activity_type VARCHAR(50),
                image_url VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `)
        console.log('🎉 date_ideas table created successfully')

        // Create likes table (simplified without user_id)
        await pool.query(`
            CREATE TABLE likes (
                id SERIAL PRIMARY KEY,
                date_idea_id INTEGER REFERENCES date_ideas(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `)
        console.log('🎉 likes table created successfully')

        // Create comments table (simplified without user_id)
        await pool.query(`
            CREATE TABLE comments (
                id SERIAL PRIMARY KEY,
                date_idea_id INTEGER REFERENCES date_ideas(id) ON DELETE CASCADE,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `)
        console.log('🎉 comments table created successfully')

        // Insert sample date ideas
        const sampleDateIdeas = [
            {
                title: "Indoor Rock Climbing Adventure",
                description: "Experience the thrill of climbing in a safe, indoor environment. Perfect for active couples!",
                location: "Indoor",
                cost_category: "medium",
                duration: "2-3 hours",
                activity_type: "active",
                image_url: "/api/placeholder/400/300"
            },
            {
                title: "Romantic Sunset Picnic",
                description: "Pack some favorite snacks and drinks for a romantic evening watching the sunset.",
                location: "Outdoor",
                cost_category: "low",
                duration: "2-3 hours",
                activity_type: "romantic",
                image_url: "/api/placeholder/400/300"
            },
            {
                title: "Cooking Class for Two",
                description: "Learn to cook a gourmet meal together under the guidance of a professional chef.",
                location: "Indoor",
                cost_category: "high",
                duration: "3-4 hours",
                activity_type: "creative",
                image_url: "/api/placeholder/400/300"
            }
        ]

        // Insert sample data
        for (const idea of sampleDateIdeas) {
            const result = await pool.query(
                `INSERT INTO date_ideas 
                (title, description, location, cost_category, duration, activity_type, image_url) 
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id`,
                [idea.title, idea.description, idea.location, idea.cost_category, 
                 idea.duration, idea.activity_type, idea.image_url]
            )
            
            // Add some sample likes and comments
            await pool.query(
                'INSERT INTO likes (date_idea_id) VALUES ($1)',
                [result.rows[0].id]
            )
            
            await pool.query(
                'INSERT INTO comments (date_idea_id, content) VALUES ($1, $2)',
                [result.rows[0].id, 'This looks amazing! Can\'t wait to try it!']
            )
            
            console.log(`✅ Date idea "${idea.title}" added successfully`)
        }

        console.log('✨ Database reset and seeded successfully!')
    } catch (error) {
        console.error('⚠️ error resetting database:', error)
    } finally {
        await pool.end()
    }
}

resetDatabase()