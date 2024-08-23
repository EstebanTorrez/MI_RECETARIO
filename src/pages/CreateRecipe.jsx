import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const CreateRecipe = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servings, setServings] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [measure, setMeasure] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreateRecipe = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/reciperover/recipes/`,
        {
          id: parseInt(id, 10),
          title,
          description,
          preparation_time: parseInt(preparationTime, 10),
          cooking_time: parseInt(cookingTime, 10),
          servings: parseInt(servings, 10),
          image
        },
        {
          headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Token ${localStorage.getItem('token')}` // 
            'Authorization': `Token ${token}`
          }
        }
      );
      setSuccess('Recipe created successfully!');
      setError('');
      // Borrar campos de formulario o redirigir a otra página
      return response.data;
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred');
      setSuccess('');
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/reciperover/recipes/${id}/categories/`,
        {
          recipe_pk: id,
          recipe: parseInt(id, 10),
          category: parseInt(category, 10),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // 
          }
        }
      );
      setSuccess('Category added successfully!');
      setError('');
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred');
      setSuccess('');
    }
  };

  const handleAddIngredient = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/reciperover/recipes/${id}/ingredients/`,
        {
          quantity: parseFloat(quantity),
          measure,
          recipe: parseInt(id, 10),
          ingredient: parseInt(ingredient, 10),
          recipe_pk: id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // 
          }
        }
      );
      setSuccess('Ingredient added successfully!');
      setError('');
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
        <Form.Group controlId="formId">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter recipe ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </Form.Group>
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
        <Form.Group controlId="formImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Recipe
        </Button>
        
        
      </Form>
      <Form>

        <Form.Group controlId="formCategory">
          <Form.Label>Category ID</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter category ID"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>

        <Button variant="secondary" onClick={handleAddCategory} className="ms-2">
          Add Category
        </Button>

        <Form.Group controlId="formIngredient">
          <Form.Label>Ingredient ID</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter ingredient ID"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formMeasure">
          <Form.Label>Measure</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter measure"
            value={measure}
            onChange={(e) => setMeasure(e.target.value)}
          />
        </Form.Group>

        <Button variant="secondary" onClick={handleAddIngredient} className="ms-2">
          Add Ingredient
        </Button>

      </Form>
    </Container>
  );
};

export default CreateRecipe;