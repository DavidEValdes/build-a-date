import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DateDetail from './pages/DateDetail';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dates/:id" element={<DateDetail />} />
      </Routes>
    </Router>
  );
}

export default App;