import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteRecipe } from '../services/recipeService';

const DeleteRecipe = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteRecipe(recipeId);
      setSuccess(true);
      navigate('/home'); // Redirige a la página de inicio o a donde desees
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Eliminar Receta</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success ? (
        <p>Receta eliminada con éxito.</p>
      ) : (
        <button onClick={handleDelete}>Eliminar Receta</button>
      )}
    </div>
  );
};

export default DeleteRecipe;
