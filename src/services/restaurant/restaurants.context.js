import React, { useState, createContext, useContext, useEffect } from "react";
import { LocationsContext } from "../location/location.context";
import { restaurantRequest, restaurantTransform } from "./restaurants.service";

//Creamos el contexto global
export const RestaurantsContext = createContext();

//Envuelve la app y le da un estado
export const RestaurantsContextProvider = ({ children }) => {

//Los tres estados de nuestra app
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    //Usamos el contexto para agarrar la locacion
    const { location } = useContext(LocationsContext);

//Con el array vacio, le indicamos que el useEffect se corra cuando el componente
//este montado

//Primero indico que esta cargando, luego añado una espera de 2 segundos (2000s)
//en la cual vamos a recuperar los restaurantes. En caso de que haya algun error,
//se utiliza el catch
    const retrieveRestaurants = (loc) => {
        setIsLoading(true);
        setRestaurants([]);

        setTimeout(() => {
            restaurantRequest(loc)
            .then(restaurantTransform)
            .then((results) => {
                setIsLoading(false);
                setRestaurants(results);
            }).catch(err => {
                setIsLoading(false);
                setError(err);
            })
        }, 2000)
    }

    //Este use effect solamente se activa cuando realizamos una busqueda.
    //decimos que si la locacion que estamos buscando, nos devuelva la latitul y
    //longitud de esta. despues pasamos esta a a retrieveRestaurants

    useEffect(() => {
        if(location){
            const locationString = `${location.lat},${location.lng}`;
            console.log(locationString);
            retrieveRestaurants(locationString);
        }
    }, [location]);

    //Esto envuelve la app y le da contexto global
    //Este componente va a hacer la mayoria del trabajo pesado. Mediante el
    //useEffect, recibimos los estados en el value={} y los pasamos a la app
    //de forma global
    return(
        <RestaurantsContext.Provider
        value={{
                restaurants, 
                isLoading, 
                error
            }}
        >
            {children}
        </RestaurantsContext.Provider>
    );
};