import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";
import "./index.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginCard />} />
        <Route path="/register" element={<RegisterCard />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </StrictMode>
);
