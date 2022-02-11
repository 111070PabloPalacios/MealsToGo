import React, { useState, useEffect } from "react";
import { StyleSheet, StatusBar, Text } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { RestaurantsScreen } from "./src/features/restaurants/components/screens/restaurant.screen";
import { theme } from "./src/Infrastructure/Theme/index";
import {
  useFonts as UseOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as UseLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RestaurantsContextProvider } from "./src/services/restaurant/restaurants.context";
import { LocationsContextProvider } from "./src/services/location/location.context";
import {
  FavouritesContext,
  FavouritesContextProvider,
} from "./src/services/favourites/favourites.context";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
//import * as firebase from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Navigation } from "./src/Infrastructure/navigation";
//const isAndroid = Platform.OS === 'android';

const Tab = createBottomTabNavigator();

const Settings = () => <Text>Settings</Text>;
const Map = () => <Text>Map</Text>;

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
};

/*const tabBarIcon = ({ size, color }) => (
  <Ionicons name={"iconName"} size={size} color={color} />
);

const screenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};*/

//Inicializa la base de datos en firebase


const firebaseConfig = {
  apiKey: "AIzaSyBs4N31KDzjQYNmtnn65RjqD4x2AiZq-qo",
  authDomain: "mealstogo-96ba7.firebaseapp.com",
  projectId: "mealstogo-96ba7",
  storageBucket: "mealstogo-96ba7.appspot.com",
  messagingSenderId: "716047845009",
  appId: "1:716047845009:web:78a1eed31f06880d85a130",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //con el useEffect activamos el login
  //usamos una funcion de firebase para autenticar al usuario. Si los datos son
  //correctos, devuelve true y todo sigue normal. Sino, se usa el catch de abajo para
  //agarrar el error y logearlo por consola
 /* useEffect(() => {
    setTimeout(() => {
      firebase
        .auth()
        .signInWithEmailAndPassword("mo@binni.io", "test123")
        .then((user) => {
          console.log(user);
          setIsAuthenticated(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }, 2000);
  }, []);*/

  const [oswaldLoaded] = UseOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = UseLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

 // if (!isAuthenticated) {
 //   return null;
 // }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          {/*<FavouritesContextProvider>
            <LocationsContextProvider>
          <RestaurantsContextProvider>*/}
                <Navigation />
              {/*</RestaurantsContextProvider>
            </LocationsContextProvider>
          </FavouritesContextProvider>*/}
          </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  search: {
    padding: 16,
  },
  list: {
    flex: 1,
    padding: 16,
    backgroundColor: "blue",
  },
});
