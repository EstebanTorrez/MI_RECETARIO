import React from 'react';//
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Profile from './pages/Profile';
import HomePrivate from './pages/HomePrivate';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
  return (
    
        <AuthProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/homeprivate" element={<PrivateRoute element={<HomePrivate />} />} />
              <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
            </Routes>
          </Router>  
        </AuthProvider>
    

  );
}

export default App;