import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CreateRecipe from './pages/CreateRecipe';
import RecipeList from './pages/RecipeList'; // Importa el componente RecipeList
import Logout from './pages/Logout'; // Importa el componente Logout
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
          <Route path="/home" element={<Home />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/logout" element={<Logout />} /> {/* Ruta para Logout */}
          <Route path="/recipe-list" element={<RecipeList />} /> {/* Nueva ruta para RecipeList */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;



