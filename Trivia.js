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