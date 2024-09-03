import axios from 'axios';

export const getComments = async (recipeId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/reciperover/comments/?recipe=${recipeId}`);      
    return response.data;
  } catch (error) {
    throw new Error('Error fetching comments: ' + error.message);
  }
};
