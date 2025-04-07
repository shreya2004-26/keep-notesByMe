import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import { SearchProvider } from "./context/SearchContext";

const App = () => {
  return (
    <div>
      <Header />
      <Home />
    </div>
  );
};

export default App;
