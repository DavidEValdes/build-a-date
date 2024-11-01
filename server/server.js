// server/server.js
import express from 'express'
import cors from 'cors'
import './config/dotenv.js'
import dateIdeasRouter from './routes/dateIdeas.js'
import usersRouter from './routes/users.js' // Add this line

const app = express()

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from React app
    credentials: true
}))
app.use(express.json())

// Welcome route
app.get('/', (req, res) => {
    res.status(200).send('<h1>💝 Build-A-Date API</h1>')
})

// Routes
app.use('/api/dates', dateIdeasRouter)
app.use('/api/users', usersRouter) // Add this line

// Placeholder image route
app.get('/api/placeholder/:width/:height', (req, res) => {
    const { width, height } = req.params;
    res.redirect(`https://via.placeholder.com/${width}x${height}`);
});

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})