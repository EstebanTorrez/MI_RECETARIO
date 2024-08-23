import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = (newToken) => setToken(newToken);
  const logout = async () => {
    try {
      // Realizar la solicitud POST para cerrar sesión
      await fetch('/users/profiles/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`, // Incluye el token en la cabecera
        },
      });
      
      // Limpiar el token y redirigir al usuario a la página de inicio de sesión
      setToken('');
      localStorage.removeItem('token');
      navigate('/login');  
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const isAuthenticated = !!token;  // Determina si el usuario está autenticado
  console.log('isAuthenticated:', isAuthenticated); // Verifica el valor de isAuthenticated


  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
