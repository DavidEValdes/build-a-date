import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import "./config/dotenv.js";
import dateIdeasRouter from "./routes/dateIdeas.js";
import usersRouter from "./routes/users.js";
import commentsRouter from "./routes/comments.js";
import imageRoutes from './routes/images.js';
import { checkRequiredEnv } from './config/check-env.js';
checkRequiredEnv();


// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(
  cors({
    // Dynamic CORS configuration based on environment
    origin: process.env.NODE_ENV === 'production'
      ? process.env.CLIENT_URL || 'https://your-app-name.herokuapp.com'
      : "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// API Routes
app.use("/api/dates", dateIdeasRouter);
app.use("/api/users", usersRouter);
app.use("/api/comments", commentsRouter);
app.use('/api/images', imageRoutes);

// Placeholder image route
app.get("/api/placeholder/:width/:height", (req, res) => {
  const { width, height } = req.params;
  res.redirect(`https://via.placeholder.com/${width}x${height}`);
});

// API Welcome route
app.get("/api", (req, res) => {
  res.status(200).send("<h1>💝 Build-A-Date API</h1>");
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from React build
  const staticPath = path.join(__dirname, '..', 'client', 'dist');
  app.use(express.static(staticPath));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Handle specific types of errors
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Invalid token' });
  }
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  
  // Default error
  res.status(500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  });
});

// Handle 404 routes
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ error: 'API endpoint not found' });
  } else if (process.env.NODE_ENV === 'production') {
    // In production, let React handle 404s for non-API routes
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
  } else {
    res.status(404).send('Not found');
  }
});

const PORT = process.env.PORT || 3001;

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  if (process.env.NODE_ENV === 'production') {
    console.log('🌐 Serving static files from React build');
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

export default app;