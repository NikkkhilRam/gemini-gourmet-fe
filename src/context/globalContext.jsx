import React, { createContext, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState("");

  return (
    <GlobalContext.Provider value={{ loading, setLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };
