import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import DateDetail from './pages/DateDetail';
import Profile from './pages/Profile';
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
                <h1>Build a Date</h1>
                <UserMenu />
              </div>
            </header>
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dates/:id" element={<DateDetail />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;