import React, { useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import { useNavigate } from "react-router";
const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isToken = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
    };
    isToken();
  }, []);
  return (
    <div>
      <Header />
      <Home />
    </div>
  );
};

export default App;
