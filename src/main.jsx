import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

console.log("%cWelcome to Meowseum! 🐾", "color: #ff6600; font-size: 16px; font-weight: bold;");
console.log("%cThe ultimate gallery of feline masterpieces! 😻", "color: #ff9900; font-size: 14px;");
console.log("%cEnjoy your visit and don’t forget to upload your cat’s finest portrait! 🎨🐱", "color: #ffcc00; font-size: 12px;");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
