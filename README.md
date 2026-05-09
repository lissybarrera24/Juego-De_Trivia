# Juego-De_Trivia
Main.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TriviaProvider } from "./context/TriviaContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TriviaProvider>
    <App />
  </TriviaProvider>
);

App.js
import Header from "./components/Header";
import Trivia from "./components/Trivia";

function App() {
  return (
    <div>
      <Header />
      <Trivia />
    </div>
  );
}

export default App;

TriviaContext.js
import { createContext, useState } from "react";

export const TriviaContext = createContext();

export const TriviaProvider = ({ children }) => {

  const [puntaje, setPuntaje] = useState(0);
  const [respondidas, setRespondidas] = useState(0);

  const sumarPunto = () => setPuntaje(puntaje + 1);
  const sumarRespondida = () => setRespondidas(respondidas + 1);

  return (
    <TriviaContext.Provider value={{
      puntaje,
      respondidas,
      sumarPunto,
      sumarRespondida
    }}>
      {children}
    </TriviaContext.Provider>
  );
};

Header.js
import { useContext } from "react";
import { TriviaContext } from "../context/TriviaContext";

function Header() {

  const { puntaje } = useContext(TriviaContext);

  return (
    <div style={{ background: "black", color: "white", padding: "15px" }}>
      <h2>Juego de Trivia</h2>
      <p>Puntaje: {puntaje}</p>
    </div>
  );
}

export default Header;

Trivia.js
import { useEffect, useState, useContext } from "react";
import { TriviaContext } from "../context/TriviaContext";

function Trivia() {

  const [preguntas, setPreguntas] = useState([]);
  const [actual, setActual] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [bloquear, setBloquear] = useState(false);

  const { sumarPunto, sumarRespondida } = useContext(TriviaContext);

  // 5 preguntas
  useEffect(() => {

    setPreguntas([
      {
        idPreguntas: 1,
        DescripcionPregunta: "React fue creado por Facebook",
        respuestaCorrecta: true
      },
      {
        idPreguntas: 2,
        DescripcionPregunta: "HTML es un lenguaje de programación",
        respuestaCorrecta: false
      },
      {
        idPreguntas: 3,
        DescripcionPregunta: "CSS sirve para diseño web",
        respuestaCorrecta: true
      },
      {
        idPreguntas: 4,
        DescripcionPregunta: "Java y JavaScript son lo mismo",
        respuestaCorrecta: false
      },
      {
        idPreguntas: 5,
        DescripcionPregunta: "useState es un hook de React",
        respuestaCorrecta: true
      }
    ]);

  }, []);

  const responder = (respuesta) => {

    setBloquear(true);

    if (respuesta === preguntas[actual].respuestaCorrecta) {
      setMensaje("Correcto");
      sumarPunto();
    } else {
      setMensaje("Incorrecto");
    }

    sumarRespondida();
  };

  const siguiente = () => {
    setActual(actual + 1);
    setMensaje("");
    setBloquear(false);
  };

  if (preguntas.length === 0) return <h2>Cargando...</h2>;

  if (actual >= preguntas.length) return <h2>Juego terminado</h2>;

  return (
    <div>
      <h3>{preguntas[actual].DescripcionPregunta}</h3>

      <button onClick={() => responder(true)} disabled={bloquear}>
        Verdadero
      </button>

      <button onClick={() => responder(false)} disabled={bloquear}>
        Falso
      </button>

      <p>{mensaje}</p>

      {bloquear && (
        <button onClick={siguiente}>
          Siguiente
        </button>
      )}
    </div>
  );
}

export default Trivia;

Package.json
{
  "name": "juego-trivia",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  }
}
