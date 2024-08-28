// AddIngredients.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { addIngredient } from '../services/ingredientService';


const AddIngredients = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const ingredientData = { name, description };
      await addIngredient(ingredientData);
      setSuccess('Ingredient added successfully!');
      setError('');
      // Reset form fields
      setName('');
      setDescription('');
    } catch (err) {
      setError(err.message || 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <Container>
      <h1>Add Ingredient</h1>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ingredient name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter ingredient description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Ingredient
        </Button>
      </Form>
    </Container>
  );
};

export default AddIngredients;

