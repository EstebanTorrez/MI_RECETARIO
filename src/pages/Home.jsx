// Página principal de la aplicación que se muestra a todos los usuarios
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <header>
        <h1>Mi Recetario</h1>
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        {/* falta implementar el receatrio en el cuerpo */}
      </main>
    </div>
  );
};

export default Home;
