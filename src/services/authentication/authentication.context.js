import React, { createContext, useState} from 'react';
import { loginRequest } from './authentication.service';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    //Esto previamente estaba como null, pero se cambia a un array vacio debido a que
    //el error se devuelve en un array
    const [error, setError] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

  //Funcion creada para autentificar
    firebase.auth().onAuthStateChanged((usr) => {
    //Si el usuario existe, carga una sesion existente en vez de iniciar una nueva.
      if(usr){
        setUser(usr);
        setIsLoading(false);
      }
      else{
        setIsLoading(false);
      }
    })
  
    const onLogin = (email, password) => {
      setIsLoading(true);
      loginRequest(email, password)
        .then((u) => {
          setUser(u);
          console.log(u);
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
          setError(e.toString());
          console.log(e);
        });
    };

    const onRegister = (email, password, repeatedPassword) => {
      setIsLoading(true);
      if (password !== repeatedPassword) {
        setError("Error: Passwords do not match");
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((u) => {
          setUser(u);
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
          setError(e.toString());
        });
    };

    const onLogout = () => {
      //.signOut limpia el estado, asi nos deslogeamos exitosamente sin usar la 
      //sintaxis de .then.catch
      firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        setError(null);
      });
    }
  

    /*const onLogin = (email,password) => {
      console.log(email);
      console.log(password);
      setIsLoading(true);
      loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
    }*/
  
    return (
      <AuthenticationContext.Provider
        value={{
          isAuthenticated: !!user,
          user,
          isLoading,
          error,
          onLogin,
          onRegister,
          onLogout
        }}
      >
        {children}
      </AuthenticationContext.Provider>
    );
  };