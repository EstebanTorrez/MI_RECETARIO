import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Obtener todas las recetas
export const getRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}/reciperover/recipes/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.detail : 'Error fetching recipes');
  }
};

// Obtener recetas por categoría
export const getRecipesByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/reciperover/recipes/?category=${categoryId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.detail : 'Error fetching recipes by category');
  }
};

// Obtener calificación de una receta
export const getRating = async (recipeId) => {
  try {
    const response = await axios.get(`${API_URL}/reciperover/ratings/${recipeId}/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.detail : 'Error fetching rating');
  }
};

// Nueva función para eliminar una receta
export const deleteRecipe = async (recipeId) => {
  const token = localStorage.getItem('token'); // Obtener el token de localStorage
  try {
    const response = await axios.delete(`${API_URL}/reciperover/recipes/${recipeId}/`, {
      headers: {
        'Authorization': `Token ${token}` // Asegúrate de que el token está bien
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.detail : 'Error deleting recipe');
  }
};

