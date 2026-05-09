import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TriviaProvider } from "./context/TriviaContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TriviaProvider>
    <App />
  </TriviaProvider>
);