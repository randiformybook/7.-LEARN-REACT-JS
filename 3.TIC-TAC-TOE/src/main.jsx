import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Ngk perlu ganti nama App menjadi Board, sesuai nama function yang ada di App.jsx karena Board itu ialah default export.

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
