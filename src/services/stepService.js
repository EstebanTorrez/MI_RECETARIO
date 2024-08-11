// Obtener los pasos para una receta especifica
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; 

export const getSteps = async (recipeId) => {
  try {
    const response = await axios.get(`${API_URL}/reciperover/steps/${recipeId}/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.detail : 'Error fetching steps');
  }
};
