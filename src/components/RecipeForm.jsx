import React, { useState } from "react";
import axios from "axios";

function RecipeForm({ setRecipe }) {
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [cuisine, setCuisine] = useState("any");
  const [customCuisine, setCustomCuisine] = useState("");
  const [diet, setDiet] = useState("any");

  const addIngredient = () => {
    if (ingredient.trim()) {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient("");
    }
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleGenerateRecipe = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `http://localhost:8000/api/recipes/generate`,
      {
        ingredients,
        cuisine: cuisine === "other" ? customCuisine : cuisine,
        diet,
      }
    );
    setRecipe(response.data.recipe);
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700">Ingredients:</label>
        <div className="flex mt-2">
          <input
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            className="flex-grow border rounded-l px-3 py-2"
            placeholder="Add ingredient"
          />
          <button
            type="button"
            onClick={addIngredient}
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
          >
            Add
          </button>
        </div>
        <ul className="mt-2 list-disc list-inside">
          {ingredients.map((ing, index) => (
            <li key={index} className="flex justify-between items-center">
              {ing}
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="text-red-500 ml-2"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Cuisine:</label>
        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-2"
        >
          <option value="any">Any</option>
          <option value="italian">Italian</option>
          <option value="mexican">Mexican</option>
          <option value="indian">Indian</option>
          <option value="chinese">Chinese</option>
          <option value="other">Other</option> {/* Add the "Other" option */}
        </select>
        {cuisine === "other" && (
          <input
            type="text"
            value={customCuisine}
            onChange={(e) => setCustomCuisine(e.target.value)}
            placeholder="Enter custom cuisine"
            className="border rounded px-3 py-2 mt-2 w-full"
          />
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Diet:</label>
        <select
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-2"
        >
          <option value="any">Any</option>
          <option value="veg">Vegetarian</option>
          <option value="non-veg">Non-Vegetarian</option>
          <option value="vegan">Vegan</option>
        </select>
      </div>
      <button
        onClick={handleGenerateRecipe}
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
      >
        Generate Recipe
      </button>
    </div>
  );
}

export default RecipeForm;
