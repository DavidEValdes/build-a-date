// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import DateDetail from './pages/DateDetail';
import Profile from './pages/Profile';
import SavedDates from './pages/SavedDates';
import UserMenu from './components/UserMenu';
import PlanADate from './pages/PlanADate';
import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Consider data stale immediately
      cacheTime: 1000 * 60 * 5, // Cache for 5 minutes
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="app">
            <header className="app-header">
              <div className="header-content">
                <Link to="/" className="header-logo">
                  <h1>Build a Date</h1>
                </Link>
                <div className="header-actions">
                  <UserMenu />
                </div>
              </div>
            </header>
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dates/:id" element={<DateDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/saved-dates" element={<SavedDates />} />
              <Route path="/plan-a-date" element={<PlanADate />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;