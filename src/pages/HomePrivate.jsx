// Página para usuarios autenticados con acceso privado.
import React from 'react';
import { Link } from 'react-router-dom';

const HomePrivate = () => {
  return (
    <div>
      <header>
        <h1>Mi Recetario Privado</h1>
        <nav>
          <ul>
            <li><Link to="/homeprivate">HomePrivate</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        {/* falta implementar el receatrio en el cuerpo */}
      </main>
    </div>
  );
};

export default HomePrivate;

