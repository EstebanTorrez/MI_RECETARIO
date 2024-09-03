import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const CreateRecipe = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servings, setServings] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [recipeId, setRecipeId] = useState(null); // Guardamos el ID de la receta creada

  const handleCreateRecipe = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/reciperover/recipes/`,
        {
          title,
          description,
          preparation_time: parseInt(preparationTime, 10),
          cooking_time: parseInt(cookingTime, 10),
          servings: parseInt(servings, 10),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          }
        }
      );

      setRecipeId(response.data.id);  // Guardamos el ID de la receta creada
      setSuccess('Recipe created successfully!');
      setError('');
      // Limpiar campos si es necesario
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <Container>
      <h1>Create Recipe</h1>
      <Form onSubmit={handleCreateRecipe}>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter recipe title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter recipe description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPreparationTime">
          <Form.Label>Preparation Time (minutes)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter preparation time"
            value={preparationTime}
            onChange={(e) => setPreparationTime(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formCookingTime">
          <Form.Label>Cooking Time (minutes)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter cooking time"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formServings">
          <Form.Label>Servings</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter number of servings"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Recipe
        </Button>
      </Form>
    </Container>
  );
};

export default CreateRecipe;