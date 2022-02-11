import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SettingsNavigator } from "./settings.navigator";
import { Ionicons } from "@expo/vector-icons";
import { Text, Button } from "react-native";
import { RestaurantsNavigator } from "./restaurants.navigator";
import { SafeArea } from "../../../src/components/utilities/safe-area.component";
import { MapScreen } from "../../features/map/screens/map.screen";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { LocationsContextProvider } from "../../services/location/location.context";
import { RestaurantsContextProvider } from "../../services/restaurant/restaurants.context";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
};

const Settings = () => {
  const { onLogout } = useContext(AuthenticationContext);

  return (
    <SafeArea>
      <Text>Settings</Text>
      <Button title="logout" onPress={() => onLogout()} />
    </SafeArea>
  );
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    headerShown: false,
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

//Despues de montar la autenticacion, movemos los context provider para aca
//ya que esto le indica a la aplicacion que cargue los datos del usuario, solamente cuando
//este se haya logeado


export const AppNavigator = () => (
  <FavouritesContextProvider>
    <LocationsContextProvider>
      <RestaurantsContextProvider>
        <Tab.Navigator
          screenOptions={createScreenOptions}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen
            screenOptions={{ headerShown: false }}
            name="Settings"
            component={SettingsNavigator}
          />
        </Tab.Navigator>
      </RestaurantsContextProvider>
    </LocationsContextProvider>
  </FavouritesContextProvider>
);
