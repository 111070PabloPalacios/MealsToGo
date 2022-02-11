import React, { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { List } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { RestaurantInfoCard } from "../restaurant-info-card.component";
import { SafeArea } from "../../../../components/utilities/safe-area.component";

export const RestaurantDetailScreen = ({ route }) => {
  //Hace un seguimiento del estado de cada acordeon en la lista
  const [breakfastExpanded, setBreakfastExpanded] = useState(true);
  const [lunchExpanded, setLunchExpanded] = useState(true);
  const [dinnerExpanded, setDinnerExpanded] = useState(true);
  const [drinksExpanded, setDrinksExpanded] = useState(true);

  const { restaurant } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 0 }}>
      <RestaurantInfoCard restaurant={restaurant} />
      {/* Esta parte obtiene informacion de su ruta (RestaurantsNavigator)
            y el restaurante que elegi mediante route. 
            Mediante const { restaurant } agarro la informacion del restaurante
            de route.params
            */}
      <ScrollView>
        <List.Accordion
          title="Breakfast"
          left={(props) => <List.Icon {...props} icon="bread-slice" />}
          expanded={breakfastExpanded}
          onPress={() => setBreakfastExpanded(!breakfastExpanded)}
        >
          <List.Item title="Eggs Benedict" />
          <List.Item title="Classic Breakfast" />
        </List.Accordion>
        <List.Accordion
          title="Lunch"
          left={(props) => <List.Icon {...props} icon="hamburger" />}
          expanded={lunchExpanded}
          onPress={() => setLunchExpanded(!lunchExpanded)}
        >
          <List.Item title="Burger w/ Fries" />
          <List.Item title="Steak Sandwich" />
          <List.Item title="Mushroom Soup" />
        </List.Accordion>
        <List.Accordion
          title="Dinner"
          left={(props) => <List.Icon {...props} icon="food-variant" />}
          expanded={dinnerExpanded}
          onPress={() => setDinnerExpanded(!dinnerExpanded)}
        >
          <List.Item title="Spaghetti Bolognese" />
          <List.Item title="Veal Cutlet with Chicken Mushroom Rotini" />
          <List.Item title="Steak Frites" />
        </List.Accordion>
        <List.Accordion
          title="Drinks"
          left={(props) => <List.Icon {...props} icon="cup" />}
          expanded={drinksExpanded}
          onPress={() => setDrinksExpanded(!drinksExpanded)}
        >
          <List.Item title="Coffee" />
          <List.Item title="Tea" />
          <List.Item title="Modelo" />
          <List.Item title="Coke" />
          <List.Item title="Fanta" />
        </List.Accordion>
      </ScrollView>
    </SafeAreaView>
  );
};
