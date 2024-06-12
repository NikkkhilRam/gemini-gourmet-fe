import React, { useContext, useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { FaFireAlt } from "react-icons/fa";
import { SiGooglegemini } from "react-icons/si";
import Dropdown from "../components/Dropdown";
import RecipeResult from "../components/RecipeResult";
import { CiCircleMinus } from "react-icons/ci";
import YoutubeModal from "../components/YoutubeModal";
import { RotatingSquare } from "react-loader-spinner";
import { GlobalContext } from "../context/globalContext";
import { dummyRecipe } from "../utils/dummy";

function MainPage() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);
  const [ingredient, setIngredient] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [customCuisine, setCustomCuisine] = useState("");
  const [dietary, setDietary] = useState("");
  const [customDietary, setCustomDietary] = useState("");
  const [calories, setCalories] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [recipeData, setRecipeData] = useState("");
  const [showRecipe, setShowRecipe] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState("");

  const [showVideos, setShowVideos] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredient) {
      setIngredientsList([...ingredientsList, ingredient]);
      setIngredient("");
    }
  };

  const handleRemoveIngredient = (index) => {
    const newIngredientsList = ingredientsList.filter((_, i) => i !== index);
    setIngredientsList(newIngredientsList);
  };

  useEffect(() => {
    const storedAPIKey = localStorage.getItem("geminiAPIKey");
    const withoutKey = localStorage.getItem("withoutKey");
    setTimeout(() => {
      if (!withoutKey) {
        setShowDemoModal(true);
      }
    }, 2000);
  }, []);

  const handleGenerateRecipe = async () => {
    setLoading(true);
    const flag = localStorage.getItem("withoutKey");

    if (!flag) {
      try {
        console.log("API Call --------------");
        const response = await fetch(
          `http://localhost:8000/api/recipes/generate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ingredients: ingredientsList,
              cuisine: cuisine === "Custom" ? customCuisine : cuisine,
              dietary: dietary === "Custom" ? customDietary : dietary,
              calories,
              cookingTime,
              servingSize,
              apiKey: localStorage.getItem("geminiAPIKey"),
            }),
          }
        );
        const data = await response.json();
        setRecipeData(data);
        setShowRecipe(true);
      } catch (error) {
        console.error("Error generating recipe:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setTimeout(() => {
        setRecipeData(dummyRecipe);
        setShowRecipe(true);
        setLoading(false);
      }, 3000);
    }
};


  const handleAPIKeySubmit = () => {
    localStorage.setItem("geminiAPIKey", geminiApiKey);
    localStorage.setItem("withoutKey", false);

    setShowDemoModal(false);
  };

  const handleReset = () => {
    setShowRecipe(false);
    setIngredientsList([]);
    setRecipeData("");
    setShowAdditionalOptions(false);
    setDietary("");
    setCuisine("");
    setCalories("");
    setCookingTime("");
    setServingSize("");
  };

  const cuisinesList = ["Mexican", "Indian", "Chinese", "Custom"];
  const dietaryList = [
    "Vegan",
    "Vegetarian",
    "Non-Vegetarian",
    "Gluten-Free",
    "Custom",
  ];

  const handleWithoutKey = () => {
    localStorage.setItem("withoutKey", true);
    setShowDemoModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col items-center mb-20 sm:pt-0 pt-[200px] logo">
        <h1 className=" text-center text-[50px] md:text-[150px]  ">
          GEMINI GOURMET
        </h1>
        <p id="tagline" className="md:flex  absolute top-[180px] text-gray-400">
          Powered by the versatile Gemini API.
        </p>
      </div>
      {!showRecipe && (
        <div className="flex  justify-center py-10 px-4">
          <div
            className={` prompt-bar flex flex-wrap items-center space-x-4 bg-gray-800 ${
              showAdditionalOptions
                ? "px-6 py-6 rounded-xl"
                : "p-4 sm:rounded-full rounded-lg"
            } w-full max-w-4xl`}
          >
            <form onSubmit={handleSubmit} className="flex-grow flex">
              <input
                value={ingredient}
                type="text"
                onChange={(e) => setIngredient(e.target.value)}
                placeholder="Ingredients"
                className="flex-grow p-3 rounded-full bg-gray-700 text-white placeholder-gray-400"
              />
              {ingredient && (
                <button type="submit" className="ml-2 text-3xl text-green-500">
                  <IoAddCircleOutline />
                </button>
              )}
            </form>

            <div className="flex gap-4 mt-3 sm:mt-0">
              {cuisine !== "Custom" ? (
                <Dropdown
                  value={cuisine}
                  onChange={(value) => {
                    setCuisine(value);
                    if (value === "Custom") {
                      setCustomCuisine("");
                    }
                  }}
                  options={cuisinesList}
                  placeholder="Select Cuisine"
                />
              ) : (
                <input
                  placeholder="Cuisine"
                  value={customCuisine}
                  onChange={(e) => setCustomCuisine(e.target.value)}
                  className="p-3 rounded-full bg-gray-700 text-white placeholder-gray-400"
                />
              )}
              {dietary !== "Custom" ? (
                <Dropdown
                  value={dietary}
                  onChange={(value) => {
                    setDietary(value);
                    if (value === "Custom") {
                      setCustomDietary("");
                    }
                  }}
                  options={dietaryList}
                  placeholder="Dietary Choice"
                />
              ) : (
                <input
                  placeholder="Dietary Option"
                  value={customDietary}
                  onChange={(e) => setCustomDietary(e.target.value)}
                  className="p-3 rounded-full bg-gray-700 text-white placeholder-gray-400"
                />
              )}
              <button
                onClick={() => setShowAdditionalOptions(!showAdditionalOptions)}
                className="text-3xl text-white"
              >
                {!showAdditionalOptions ? (
                  <IoAddCircleOutline />
                ) : (
                  <CiCircleMinus />
                )}
              </button>
            </div>

            {showAdditionalOptions && (
              <div className="flex w-full justify-center mt-4">
                <div className="">
                  <div className="flex flex-wrap space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex-grow flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Calories"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        className="flex-grow p-3 rounded-full bg-gray-700 text-white placeholder-gray-400"
                      />
                      <span className="text-white">kcal</span>
                    </div>
                    <div className="flex-grow flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Cooking Time"
                        value={cookingTime}
                        onChange={(e) => setCookingTime(e.target.value)}
                        className="flex-grow p-3 rounded-full bg-gray-700 text-white placeholder-gray-400"
                      />
                      <span className="text-white">min</span>
                    </div>
                    <div className="flex-grow flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Serving Size"
                        value={servingSize}
                        onChange={(e) => setServingSize(e.target.value)}
                        className="flex-grow p-3 rounded-full bg-gray-700 text-white placeholder-gray-400"
                      />
                      <span className="text-white">pax</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {!showRecipe && ingredientsList.length > 0 && (
        <div className="flex justify-center py-4">
          <div className="bg-gray-800 rounded-lg p-4 sm:w-1/3 max-w-4xl mx-4 sm:mx-0 flex flex-wrap gap-3">
            {ingredientsList.map((item, index) => (
              <div
                key={index}
                className="flex items-center w-min sm:w-full md:w-auto  text-gray-900 justify-between p-3 font-medium rounded-md bg-white"
              >
                <p className="uppercase">{item}</p>
                <IoIosClose
                  size={24}
                  className="cursor-pointer text-gray-900"
                  onClick={() => handleRemoveIngredient(index)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {!showRecipe && ingredientsList.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleGenerateRecipe}
            className={`${
              loading ? "rounded-none" : "bg-gray-700 py-3 px-6"
            } flex items-center gap-4  rounded-full text-white text-xl font-bold mb-10 border     bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <RotatingSquare
                  visible={true}
                  height="100"
                  width="100"
                  color="#fff"
                  ariaLabel="rotating-square-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 ">
                <p>Generate Recipe</p>
                <SiGooglegemini />
              </div>
            )}
          </button>
        </div>
      )}

      <div className="flex items-center justify-center gap-4">
        {recipeData.recipe && recipeData.recipe.length > 10 && (
          <button
            onClick={() => setShowVideos(true)}
            className="flex justify-center px-4 py-2 rounded-full font-bold border hover:bg-gray-900 hover:border hover:text-white bg-white text-gray-700 "
          >
            Find recipe videos
          </button>
        )}

        {recipeData.recipe && (
          <button
            onClick={handleReset}
            className="flex justify-center px-4 py-2 rounded-full font-bold border hover:bg-gray-900 hover:border hover:text-white bg-white text-gray-700 "
          >
            Create new recipe
          </button>
        )}
      </div>

      {recipeData.recipe && (
        <div className="flex justify-center py-4">
          <RecipeResult
            recipe={recipeData.recipe}
            calories={calories}
            cookingTime={cookingTime}
            cuisine={cuisine}
            dietary={dietary}
            servingSize={servingSize}
          />
        </div>
      )}

      {showVideos && (
        <YoutubeModal
          recipeName={recipeData.recipeName}
          onClose={() => {
            setShowVideos(false);
          }}
        />
      )}

      {showDemoModal && (
        <div className="fixed z-10 inset-0 pt-[200px] bg-gray-900 bg-opacity-90    overflow-y-auto ">
          <div className="flex items-center justify-center max-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="inline-block align-bottom bg-gray-900  min-w-[400px] shadow-md shadow-white sm:min-w-[lg-width] sm:w-full sm:mt-0 mt-[200px] text-white rounded-lg max-h-[500px] text-left transform transition-all sm:my-8 sm:align-middle sm:max-w-lg relative">
              <div>
                <div className="p-4">
                  <p>
                    This project requires a Gemini API key. Dont worry, the key
                    will be stored in your local storage securely.
                  </p>
                  <input
                    type="text"
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    placeholder="Enter your Gemini API key"
                    className="block w-full p-2 mt-4 border text-black rounded-md"
                  />
                </div>
                <div className="flex justify-end gap-2 p-4">
                  <button
                    onClick={handleWithoutKey}
                    className="px-4 py-2 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700"
                  >
                    Continue without Key
                  </button>

                  <button
                    onClick={handleAPIKeySubmit}
                    className="px-4 py-2 font-medium text-white rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
