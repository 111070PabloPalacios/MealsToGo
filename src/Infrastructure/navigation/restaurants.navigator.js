import React from "react";
import { Text } from "react-native";
import { RestaurantsScreen } from "../../features/restaurants/components/screens/restaurant.screen";
import { RestaurantDetailScreen } from "../../features/restaurants/components/screens/restaurant.detail.screen";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
//La navegacion, en vez de estar basada en pestañas va a estar basada en
//stacks

const RestaurantStack = createStackNavigator();
export const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator
    headerMode="none"
    screenOptions={{
      //Sirve para dar una transicion en vez de hacer que el 
      //elemento simplemente aparezca en pantalla
      ...TransitionPresets.ModalPresentationIOS,
    }}
    >
      <RestaurantStack.Screen
        name="Restaurants"
        component={RestaurantsScreen}
      />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
      />
    </RestaurantStack.Navigator>
  );
};
