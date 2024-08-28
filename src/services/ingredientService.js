import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const addIngredient = async (ingredientData) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.post(`${API_URL}/reciperover/ingredients/`, ingredientData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.detail : 'Error adding ingredient');
  }
};

// Añadir la función getIngredient
export const getIngredient = async (ingredientId) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(`${API_URL}/reciperover/ingredients/${ingredientId}/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.detail : 'Error fetching ingredient');
  }
};
