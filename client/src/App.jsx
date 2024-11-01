// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import DateDetail from './pages/DateDetail';
import Profile from './pages/Profile';
import SavedDates from './pages/SavedDates';
import UserMenu from './components/UserMenu';
import './App.css';

const queryClient = new QueryClient();

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
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;