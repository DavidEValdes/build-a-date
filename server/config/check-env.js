export const checkRequiredEnv = () => {
    const required = [
      'NODE_ENV',
      'PEXELS_API_KEY',
      'VITE_TMDB_API_KEY',
      'VITE_TMDB_ACCESS_TOKEN',
    ];
  
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      console.error('Missing required environment variables:', missing.join(', '));
      process.exit(1);
    }
  
    // Check database configuration
    const hasHerokuDb = !!process.env.DATABASE_URL;
    const hasRailwayDb = !!(process.env.PGHOST && process.env.PGDATABASE && process.env.PGUSER && process.env.PGPASSWORD);
  
    if (!hasHerokuDb && !hasRailwayDb) {
      console.error('No valid database configuration found');
      process.exit(1);
    }
  
    console.log('Environment check passed');
    console.log('Using database:', hasHerokuDb ? 'Heroku' : 'Railway');
    console.log('Environment:', process.env.NODE_ENV);
  };