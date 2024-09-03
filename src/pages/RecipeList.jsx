import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { getRecipes } from '../services/recipeService'; // Usa getRecipes en lugar de getAllRecipes

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes(); // Llama a getRecipes
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <Container>
      <h1>Recipe List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map(recipe => (
            <tr key={recipe.id}>
              <td>{recipe.id}</td>
              <td>{recipe.title}</td>
              <td>{recipe.description}</td>
              <td>
                <Button variant="info" as="a" href={`/recipe/${recipe.id}`}>
                  View
                </Button>
                <Button variant="warning" as="a" href={`/update-recipe/${recipe.id}`} style={{ marginLeft: '10px' }}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default RecipeList;
