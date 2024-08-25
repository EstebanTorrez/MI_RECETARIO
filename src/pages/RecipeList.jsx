import React, { useEffect } from 'react';
import useFetch from '../hooks/useFetch'; // Ajusta la ruta según la estructura de tu proyecto

const RecipeList = () => {
    const { data: recipes, isLoading, isError, doFetch } = useFetch('https://sandbox.academiadevelopers.com/reciperover/recipes');

    useEffect(() => {
        doFetch(); // Llama a la función para cargar los datos
    }, [doFetch]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {isError}</p>;

    return (
        <div>
            <h1>Recipe List</h1>
            <ul>
                {recipes && recipes.map(recipe => (
                    <li key={recipe.id}>{recipe.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
