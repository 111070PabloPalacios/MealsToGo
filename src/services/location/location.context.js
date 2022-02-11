import React, { useState, useEffect, createContext } from "react";
import { locationRequest, locationTransform } from "./location.service";

//Creo el contexto global
export const LocationsContext = createContext();

//Envuelve la app y le da un estado
//search: () => null
//Esto significa que vamos a pasar una funcion para ser activada mas adelante

export const LocationsContextProvider = ({ children }) => {
  //Los tres estados de nuestra app
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("san francisco");

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);

    /*
    if(!searchKeyword.length){
        //Si la palabra esta vacia, no hagas nada
        return;
    }
    locationRequest(searchKeyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        setIsLoading(false);
        setLocation(result);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });*/
  };

  //Esto es mas eficiente que el codigo anterior en donde se usaba el useEffect
//en el search.component ya que esta centralizado en un mismo lugar y no se renderiza
//constantemente, solamente se renderiza una vez que la constante keyword adquiere otro valor,
//es decir cuando se realiza una busqueda

  useEffect(() => {
    if(!keyword.length){
      //Si la palabra esta vacia, no hagas nada
      return;
  }
  locationRequest(keyword.toLowerCase())
    .then(locationTransform)
    .then((result) => {
      setIsLoading(false);
      setLocation(result);
    })
    .catch((err) => {
      setIsLoading(false);
      setError(err);
    });
  }, [keyword]);

  return (
    <LocationsContext.Provider
      value={{
        isLoading,
        error,
        location,
        search: onSearch,
        keyword,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
};
