import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
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
      staleTime: 0,
      cacheTime: 1000 * 60 * 5,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
});

// Create a new Header component to use navigation
const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <a 
          href="/" 
          onClick={handleLogoClick}
          className="header-logo"
        >
          <h1>Build a Date</h1>
        </a>
        <div className="header-actions">
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="app">
            <Header />
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