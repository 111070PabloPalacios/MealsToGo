import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//Se mueve a servicio para despues pasarlo a contexto.
//
  
export const loginRequest = (email, password) => 
firebase.auth().signInWithEmailAndPassword(email, password);