import React, { useState } from "react";
import RecipeForm from "./components/RecipeForm";
import RecipeResult from "./components/RecipeResult";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import { GlobalProvider } from "./context/globalContext";
import LayoutPage from "./pages/LayoutPage";

function App() {
  const [recipe, setRecipe] = useState(null);

  return (
    <div className="min-h-screen bg-red-50">
      <GlobalProvider>
        <LayoutPage>
          <BrowserRouter>
            <Routes>
              <Route index path="/" element={<MainPage />} />
            </Routes>
          </BrowserRouter>
        </LayoutPage>
      </GlobalProvider>
    </div>
  );
}

export default App;
