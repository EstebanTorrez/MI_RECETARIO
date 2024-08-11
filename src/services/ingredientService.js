// Muestra los detalles de los ingrsdientes por su ID
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; 

export const getIngredient = async (ingredientId) => {
  try {
    const response = await axios.get(`${API_URL}/reciperover/ingredients/${ingredientId}/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.detail : 'Error fetching ingredient');
  }
};
