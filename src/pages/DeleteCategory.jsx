import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteCategory } from '../services/category';

const DeleteCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteCategory(categoryId);
      setSuccess(true);
      navigate('/home'); // Redirige a la página de inicio o a donde desees
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Eliminar Categoría</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success ? (
        <p>Categoría eliminada con éxito.</p>
      ) : (
        <button onClick={handleDelete}>Eliminar Categoría</button>
      )}
    </div>
  );
};

export default DeleteCategory;
