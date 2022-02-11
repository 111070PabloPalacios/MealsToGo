import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator, Colors, List } from "react-native-paper";
import { RestaurantInfoCard } from "../restaurant-info-card.component";
import { Search } from "../search.component";
import { FavouritesBar } from "../../../../components/favourites/favourites-bar.component";
//import { SafeArea } from "../../../../components/utilities/safe-area.component";
import styled from "styled-components/native";
import { RestaurantsContext } from "../../../../services/restaurant/restaurants.context";
import { FavouritesContext } from "../../../../services/favourites/favourites.context";

//const isAndroid = Platform.OS === 'android';

export const RestaurantsScreen = ({ navigation }) => {
  //Le paso el contexto creado a useContext;
  //IMPORTANTE: aca paso directamente las props de restaurants.contest
  //pero tambien podria referenciarlas usando RestaurantsContext.nombredeprop
  const { isLoading, restaurants } = useContext(RestaurantsContext);
  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);

  return (
    <SafeArea>
      {isLoading && (
        <View style={{ position: "absolute", top: "50%", left: "50%" }}>
          <ActivityIndicator
            size={50}
            style={{ marginLeft: -25 }}
            animating={true}
            color={Colors.blue300}
          />
        </View>
      )}
      {/*Flex en safeareaview se asegura de que el contenido ocupe
    el espacio total de la pantalla*/}
      <Search isFavouritesToggled={isToggled} 
      onFavouritesToggle={() => setIsToggled(!isToggled)}/>
      {isToggled && <FavouritesBar favourites={favourites} onNavigate={navigation.navigate}/>}
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", {
                  restaurant: item,
                })
              }
            >
              <RestaurantInfoCard restaurant={item} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: { padding: 16 },
})``;

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top:${StatusBar.currentHeight}px`};
`;

const SearchView = styled(View)`
  padding-bottom: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
`;

const ListView = styled(View)`
  flex: 1;
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.brand.secondary};
`;
