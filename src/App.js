import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
//importing compoennts
import Login from './components/Login/Login';
import Signup from './components/signup/Signup';
import Home from './components/Home/Home';
import Note from './components/Note/Note';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/notes/:id' element={<Note />} />
      </Routes>
    </Router>
  );
}

export default App;
