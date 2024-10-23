import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Myprovider from "./Components/Context/Myprovider.jsx";
createRoot(document.getElementById("root")).render(
  <Myprovider>
    <App />
  </Myprovider>
);
