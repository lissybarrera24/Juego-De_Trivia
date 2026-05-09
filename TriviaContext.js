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