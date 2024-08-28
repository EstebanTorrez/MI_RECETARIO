import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CreateRecipe from './pages/CreateRecipe';
import Logout from './pages/Logout';
import DeleteRecipe from './pages/DeleteRecipe'; // Importa el componente DeleteRecipe
import DeleteCategory from './pages/DeleteCategory'; // Importa el componente DeleteCategory
import AddIngredients from './components/AddIngredients'; // Importa el componente AddIngredients
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
          <Route path="/logout" element={<Logout />} />
          <Route path="/delete-recipe/:recipeId" element={<PrivateRoute element={<DeleteRecipe />} />} />
          <Route path="/delete-category/:categoryId" element={<PrivateRoute element={<DeleteCategory />} />} />
          <Route path="/add-ingredients" element={<PrivateRoute element={<AddIngredients />} />} /> {/* Ruta añadida */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
