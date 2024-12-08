// src/pages/Home.js

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; 

const API_KEY = '6e253e1f9a8f4dbb9a5a3ebf5ae6eded';

// Custom spinner for loading state using Tailwind CSS
function CustomSpinner() {
  return (
    <div className="w-16 h-16 border-4 border-blue-500 border-dotted border-t-transparent rounded-full animate-spin"></div>
  );
}

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?number=6&apiKey=${API_KEY}`);
        const data = await response.json();
        const cleanedData = data.recipes.map(recipe => ({
          ...recipe,
          summary: stripHtmlTags(recipe.summary),
          instructions: stripHtmlTags(recipe.instructions)
        }));
        setRecipes(cleanedData);
      } catch (error) {
        setError('Failed to fetch recipes');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
        <section className="bg-[url('https://img.freepik.com/premium-photo/cooking-banner-kitchen-black-table-ingredients-food-top-view-free-space-your-text_187166-59583.jpg')] relative bg-center bg-cover bg-no-repeat">
            <div className="text-white container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
                <h1 className="text-4xl font-bold leading-none sm:text-5xl">All Your Food Recipes
                    <span className="dark:text-violet-600">One Place.</span>
                </h1>
                <p className="px-8 mt-8 mb-12 text-lg">Cupiditate minima voluptate temporibus quia? Architecto beatae esse ab amet vero eaque explicabo!</p>
                <div className="flex flex-wrap justify-center">
                    <button className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-violet-600 dark:text-gray-50">Get started</button>
                    <button className="px-8 py-3 m-2 text-lg border rounded dark:text-gray-900 dark:border-gray-300">Learn more</button>
                </div>
            </div>
        </section>
      {/* <h1 className="text-3xl font-bold mb-4">Recipe Book</h1> */}
      <div className='justify-items-center mt-6'>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[1200px] ">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="border p-4 rounded-lg shadow-md">
            <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded-t-lg" />
            <h2 className="text-xl font-semibold mt-2">{recipe.title.split(' ').slice(0, 5).join(' ') + '...'}</h2>
            <p className="text-gray-700">
                {recipe.summary.split(' ').slice(0, 50).join(' ') + '...' }
            </p>
            {/* <p className="text-gray-600 mt-2">{recipe.instructions}</p> */}
            <Link
              to={`/recipe/${recipe.id}`}
              className=" hover:underline mt-2 inline-block bg-black px-8 py-3 rounded text-white"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
      </div>
    </div>
    
  );
}

function stripHtmlTags(str) {
  if (!str) return '';
  return str.replace(/<\/?[^>]+(>|$)/g, '');
}

export default Home;