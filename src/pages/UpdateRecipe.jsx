import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; // se usa useParams para obtener el ID de la receta
import { getRecipeById, updateRecipe } from '../services/recipeService';

const UpdateRecipe = () => {
  const { id } = useParams(); // se obtiene el ID de la receta desde los parametros de la URL
  const [recipe, setRecipe] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servings, setServings] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
        setTitle(data.title);
        setDescription(data.description);
        setPreparationTime(data.preparation_time);
        setCookingTime(data.cooking_time);
        setServings(data.servings);
      } catch (error) {
        setError('Error fetching recipe');
      }
    };

    fetchRecipe();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedRecipe = { title, description, preparation_time: preparationTime, cooking_time: cookingTime, servings };
      await updateRecipe(id, updatedRecipe);
      alert('Receta actualizada con éxito');  
    } catch (error) {
      setError('Error updating recipe');
    }
  };

  return (
    <Container>
      <h1>Update Recipe</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {recipe && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="preparationTime">
            <Form.Label>Preparation Time (minutes)</Form.Label>
            <Form.Control type="number" value={preparationTime} onChange={(e) => setPreparationTime(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="cookingTime">
            <Form.Label>Cooking Time (minutes)</Form.Label>
            <Form.Control type="number" value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="servings">
            <Form.Label>Servings</Form.Label>
            <Form.Control type="number" value={servings} onChange={(e) => setServings(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Recipe
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default UpdateRecipe;

