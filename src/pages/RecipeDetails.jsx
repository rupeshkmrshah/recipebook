import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_KEY = '6e253e1f9a8f4dbb9a5a3ebf5ae6eded';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
      .then((response) => {
        const cleanedData = {
          ...response.data,
          summary: stripHtmlTags(response.data.summary),
          instructions: stripHtmlTags(response.data.instructions)
        };
        setRecipe(cleanedData);
      })
      .catch((error) => {
        console.error('Error fetching recipe details:', error);
      });
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4 pt-8">
      <div className="bg-white p-4 rounded shadow-lg">
        <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <h2 className="text-2xl font-semibold">Summary:</h2>
        <p className="">
            {recipe.summary}
            </p>
        <h2 className="text-2xl font-semibold">Ingredients:</h2>
        <ul className="list-disc ml-6">
          {recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id} className="text-lg">{ingredient.original}</li>
          ))}
        </ul>
        <h2 className="text-2xl font-semibold mt-4">Instructions:</h2>
        <p className="text-lg">{recipe.instructions}</p>
      </div>
    </div>
  );
}

function stripHtmlTags(str) {
  if (!str) return '';
  return str.replace(/<\/?[^>]+(>|$)/g, '');
}

export default RecipeDetails;
