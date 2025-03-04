// Muestra las categorias en el menu desplegable
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; 

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/reciperover/categories/`);
    return response.data.results; // Devuelve solo las categorías
  } catch (error) {
    throw new Error('Error al obtener las categorías');
  }
};

// Nueva función para eliminar una categoría
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${API_URL}/reciperover/categories/${categoryId}/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.detail : 'Error deleting category');
  }
};
