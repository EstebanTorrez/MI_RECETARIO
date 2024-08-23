import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}/reciperover/recipes/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.detail : 'Error fetching recipes');
  }
};

export const getRecipesByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/reciperover/recipes/?category=${categoryId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.detail : 'Error fetching recipes by category');
  }
};

export const getRating = async (recipeId) => {
  try {
    const response = await axios.get(`${API_URL}/reciperover/ratings/${recipeId}/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.detail : 'Error fetching rating');
  }
};
