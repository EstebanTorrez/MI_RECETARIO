import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col, Spinner, Alert, NavDropdown, Modal } from 'react-bootstrap';
import { getRecipes, getRecipesByCategory } from '../services/recipeService'; 
import { getCategories } from '../services/category';
import { getComments } from '../services/commentService';
import { getRating } from '../services/ratingService';
import { getIngredient } from '../services/ingredientService';
import { getSteps } from '../services/stepService';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [ratings, setRatings] = useState(null);
  const [ingredient, setIngredient] = useState(null);
  const [steps, setSteps] = useState([]);
  const [categoryRecipes, setCategoryRecipes] = useState([]);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showRatingsModal, setShowRatingsModal] = useState(false);
  const [showIngredientModal, setShowIngredientModal] = useState(false);
  const [showStepsModal, setShowStepsModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipeData = await getRecipes();
        setRecipes(recipeData.results);

        const categoryData = await getCategories();
        setCategories(categoryData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategorySelect = async (categoryId) => {
    try {
      const data = await getRecipesByCategory(categoryId);
      setCategoryRecipes(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleShowComments = async (recipeId) => {
    try {
      const data = await getComments(recipeId);
      setComments(data.results || []);
      setSelectedRecipe(recipeId);
      setShowCommentsModal(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleShowRatings = async (recipeId) => {
    try {
      const data = await getRating(recipeId);
      setRatings(data);
      setSelectedRecipe(recipeId);
      setShowRatingsModal(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleShowIngredient = async (ingredientId) => {
    try {
      const data = await getIngredient(ingredientId);
      setIngredient(data);
      setShowIngredientModal(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleShowSteps = async (recipeId) => {
    try {
      const data = await getSteps(recipeId);
      setSteps(data.results || []);
      setSelectedRecipe(recipeId);
      setShowStepsModal(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCloseComments = () => setShowCommentsModal(false);
  const handleCloseRatings = () => setShowRatingsModal(false);
  const handleCloseIngredient = () => setShowIngredientModal(false);
  const handleCloseSteps = () => setShowStepsModal(false);

  return (
    <Container>
      <header>
        <h1>Mi Recetario</h1>
        <NavDropdown title="Categories" id="basic-nav-dropdown" onSelect={handleCategorySelect}>
          {categories.map(category => (
            <NavDropdown.Item key={category.id} eventKey={category.id}>
              {category.name}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </header>
      <main>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
            <p>Loading...</p>
          </div>
        ) : error ? (
          <Alert variant="danger">
            {error}
          </Alert>
        ) : (
          <Row>
            {(categoryRecipes.length > 0 ? categoryRecipes : recipes).map(recipe => (
              <Col key={recipe.id} md={4} className="mb-4">
                <Card>
                  {recipe.image && (
                    <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
                  )}
                  <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <Card.Text>{recipe.description}</Card.Text>
                    <Card.Text>
                      <strong>Prep Time:</strong> {recipe.preparation_time} mins
                    </Card.Text>
                    <Card.Text>
                      <strong>Cook Time:</strong> {recipe.cooking_time} mins
                    </Card.Text>
                    <Card.Text>
                      <strong>Servings:</strong> {recipe.servings}
                    </Card.Text>
                    <Button variant="primary" onClick={() => handleShowIngredient(recipe.id)}>
                      View Recipe
                    </Button>
                    <Button variant="primary" onClick={() => handleShowComments(recipe.id)}>
                      Comments
                    </Button>
                    <Button variant="primary" onClick={() => handleShowRatings(recipe.id)}>
                      Ratings
                    </Button>
                    <Button variant="primary" onClick={() => handleShowSteps(recipe.id)}>
                      Steps
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </main>

      {/* Modal para mostrar los comentarios */}
      <Modal show={showCommentsModal} onHide={handleCloseComments}>
        <Modal.Header closeButton>
          <Modal.Title>Comments for Recipe {selectedRecipe}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} className="mb-3">
                <p><strong>Comment:</strong> {comment.content}</p>
                <p><strong>Created At:</strong> {new Date(comment.created_at).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>No comments found.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseComments}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para mostrar las valoraciones */}
      <Modal show={showRatingsModal} onHide={handleCloseRatings}>
        <Modal.Header closeButton>
          <Modal.Title>Ratings for Recipe {selectedRecipe}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ratings ? (
            <div>
              <p><strong>Rating:</strong> {ratings.rating}</p>
              <p><strong>Comment:</strong> {ratings.comment}</p>
              <p><strong>Created At:</strong> {new Date(ratings.created_at).toLocaleString()}</p>
            </div>
          ) : (
            <p>No ratings found.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRatings}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para mostrar los detalles del ingrediente */}
      <Modal show={showIngredientModal} onHide={handleCloseIngredient}>
        <Modal.Header closeButton>
          <Modal.Title>Ingredient Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ingredient ? (
            <div>
              <p><strong>Name:</strong> {ingredient.name}</p>
              <p><strong>Description:</strong> {ingredient.description || 'No description available'}</p>
              <p><strong>Created At:</strong> {new Date(ingredient.created_at).toLocaleString()}</p>
              <p><strong>Owner:</strong> {ingredient.owner}</p>
            </div>
          ) : (
            <p>No ingredient details found.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseIngredient}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para mostrar los pasos */}
      <Modal show={showStepsModal} onHide={handleCloseSteps}>
        <Modal.Header closeButton>
          <Modal.Title>Steps for Recipe {selectedRecipe}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {steps.length > 0 ? (
            steps.map(step => (
              <div key={step.id} className="mb-3">
                <p><strong>Order:</strong> {step.order}</p>
                <p><strong>Instruction:</strong> {step.instruction}</p>
                <p><strong>Created At:</strong> {new Date(step.created_at).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>No steps found.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSteps}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Home;