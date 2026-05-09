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