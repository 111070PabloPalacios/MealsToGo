import React from "react";
import { Address, Rating, SectionEnd, Section, RestaurantCard, Cover, Icon, Open, Info} from "./restaurant-info-card.styles";
import { Card } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { Favourite } from "../../../components/favourites/favourites.component";
import styled from "styled-components/native";
import star from "../../../../assets/star";
import open from "../../../../assets/open";

export const RestaurantInfoCard = ({ restaurant = {} }) => {
  const {
    name = "Nombre Default",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    address = "Calle x",
    isOpenNow = true,
    rating = 4,
    isClosedTemporary = true,
    //Agarro esta propiedad una vez ya construida la barra de busqueda
    //Su objetivo es funcionar como parte de la key de estrellas
    placeId
  } = restaurant; //Restaurante es un objeto con propiedades. Aqui tomamos esas propiedades

  const ratingArray = Array.from(new Array(Math.ceil(rating)));

  return (
    <RestaurantCard elevation={5}>
      <Favourite restaurant={restaurant}/>
      <Cover source={{ uri: photos[0] }} />
      <Info>
        <Text variant="label">{name}</Text>
        <Section>
          <Rating>
            {ratingArray.map((_, i) => (
              <SvgXml key={`star-${placeId}-${i}`} xml={star} width={20} height={20} />
            ))}
          </Rating>
          <SectionEnd>
            {isClosedTemporary && 
            <Text variant="error">
             CLOSED TEMPORARILY  
            </Text>}
            <Spacer position='left' size='large'/>
            {isOpenNow && <Open xml={open} width={20} height={20}/>}
            <Spacer position='left' size='large'/>
            <Icon source={{uri: icon}}/>
          </SectionEnd>
        </Section>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};

//lo que nos permite hacer el attrs es acceder a atributos concretos
//del elemento que queramos manipular

//Remuevo Title debido a que el componente Text ahora puede recibir variables
/*const Title = styled.Text`
font-family: ${(props) => props.theme.fonts.heading};
font-size: ${(props) => props.theme.fontSizes.body}
color: ${(props) => props.theme.colors.ui.primary};`;*/


