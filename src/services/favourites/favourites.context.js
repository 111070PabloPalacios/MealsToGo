import React, { createContext, useEffect, useState, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../authentication/authentication.context";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  //Añado esto al final del proceso, cuando este trabajando en el login
  const { user } = useContext(AuthenticationContext);
  //saveFavourites y loadFavourites se añaden una vez que se compruebe que
  //el resto del contexto funciona correctamente. Sirven para poder almacenar
  //la lista de favoritos al salir de la aplicacion.

  //PRE-USECONTEXT DE AUTENTICACION
/*  const saveFavourites = async(value) => {
    try{
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@favourites", jsonValue);
  }catch(e){
      console.log(e);
      //en caso de error, hacemos un console log 
    }
  };*/

  //uid hace referencia a un parametro unico del user que recibo del contexto de 
  //autenticacion. Cada favorito va a estar asociado a dicho usiario. Hago lo mismo
  //con loadFavourites

  const saveFavourites = async(value, uid) => {
    try{
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
  }catch(e){
      console.log(e);
      //en caso de error, hacemos un console log 
    }
  };

  //PRE AUTENTICACION
 /* const loadFavourites = async(value) => {
    try{
      const value = await AsyncStorage.getItem('@favourites');
      if(value !== null) {
        setFavourites(JSON.parse(value));
      }
    }catch(e){
      console.log(e);
    }
  };*/

  const loadFavourites = async(uid) => {
    try{
      const value = await AsyncStorage.getItem(`@favourites-${uid}`);
      if(value !== null) {
        setFavourites(JSON.parse(value));
      }
    }catch(e){
      console.log(e);
    }
  };

  //Añade un restaurante al array de restaurantes favoritos
  const add = (restaurant) => {
    setFavourites([...favourites, restaurant]);
  };

  const remove = (resturant) => {
    //NewFavourites: Filtra por placeId y lo compara con placeId del restaurante
    //y dice que si la Id coincide, que no lo añada a favoritos, porque el mismo ya
    //se encuentra en el array
    const newFavourites = favourites.filter(
      (x) => x.placeId !== resturant.placeId
    );

    setFavourites(newFavourites);
  };

  //cargamos los favoritos en el primer mount de nuestro contexto
  //PRE AUTENTICACION
  /*useEffect(() => {
    loadFavourites();
  },[]);

  //cambiamos la lista de favoritos cada vez que estos cambian
  //PRE AUTENTICACION
  useEffect(() => {
    saveFavourites(favourites);
  }, [favourites]);*/

  useEffect(() => {
    //Le digo que cargue los favoritos solamente si user tiene un valor
    if(user && user.uid){
      loadFavourites(user.uid);
    }
  },[user]);

  useEffect(() => {
    if(user && user.uid && favourites.length){
      saveFavourites(favourites, user.uid);
    }
  }, [favourites, user]);

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites: add,
        removeFavourites: remove,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
