// Lista de recetas disponobles
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; 

/*
export const getRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}/reciperover/recipes/`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching recipes: ' + error.message);
  }
};
*/

export const getRecipes = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/reciperover/recipes/`, {
      params: { page },
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const getRecipesByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/reciperover/categories/${categoryId}/`);
    const recipeIds = response.data.recipes;

    // Obtener detalles de recetas por sus IDs
    const recipes = await Promise.all(
      recipeIds.map(id => axios.get(`${API_URL}/reciperover/recipes/${id}/`).then(res => res.data))
    );

    return recipes;
  } catch (error) {
    throw new Error(error.response ? error.response.data.detail : 'Error fetching recipes by category');
  }
};