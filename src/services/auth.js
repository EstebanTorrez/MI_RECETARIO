import axios from 'axios';

// Obtener las URLs de las variables de entorno
const API_URL = import.meta.env.VITE_API_URL;
const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;
const PROFILE_URL = import.meta.env.VITE_PROFILE_URL;
const UPDATE_PROFILE = import.meta.env.VITE_UPDATE_PROFILE;
const UPLOAD_PROFILE_IMAGE = import.meta.env.VITE_UPLOAD_PROFILE_IMAGE;

// Iniciar sesión
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}${LOGIN_URL}`, { username, password });
    const token = response.data.token;  // Asegúrate de ajustar esto según la estructura de tu respuesta
    if (token) {
      localStorage.setItem('token', token);  // Almacena el token en localStorage
    }
    return response.data;  // Devuelve los datos necesarios
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Error al iniciar sesión');
  }
};

// Obtiene el perfil del usuario
export const getProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}${PROFILE_URL}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`  // Usa el token almacenado en localStorage
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Error al obtener perfil');
  }
};

// Actualizar el perfil del usuario
export const updateProfile = async (userId, profileData) => {
  try {
    const response = await axios.patch(`${API_URL}${UPDATE_PROFILE}${userId}/`, profileData, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,  // Usa el token almacenado en localStorage
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Error al actualizar perfil');
  }
};

// Cargar una imagen en el perfil del usuario
export const uploadProfileImage = async (userId, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axios.patch(`${API_URL}${UPLOAD_PROFILE_IMAGE}${userId}/`, formData, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,  // Usa el token almacenado en localStorage
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw new Error(error.response?.data?.detail || 'Error al subir la imagen');
  }
};
