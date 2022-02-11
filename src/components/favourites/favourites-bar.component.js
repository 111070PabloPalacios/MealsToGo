import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Text } from "../typography/text.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { CompactRestaurantInfo } from "../../components/restaurant/compact-restaurant-info.component";

const FavouritesWrapper = styled.View`
  padding: 10px;
`;
//Las propiedades del scrollview son para poder deslizer de manera horizontal
//(hacia los costados) y no hacia abajo

//onNavigate es un atributo que pasamos desde restaurant.screen y es una funcion
//que va a ser ejecutada en el onPress. Nos permite navegar hasta el componente
//de detalles
export const FavouritesBar = ({ favourites, onNavigate }) => {
  if(!favourites.length){
      return null;
  }
  return (
    <FavouritesWrapper>
      <Spacer>
        <Text variant="caption">Favourites</Text>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favourites.map((restaurant) => {
          const key = restaurant.name;
          return (
            <Spacer key={key} position="left" size="medium">
              <TouchableOpacity
                onPress={() => {
                  onNavigate("RestaurantDetail", { restaurant });
                }}
              >
                <CompactRestaurantInfo restaurant={restaurant} />
              </TouchableOpacity>
            </Spacer>
          );
        })}
      </ScrollView>
    </FavouritesWrapper>
  );
};
