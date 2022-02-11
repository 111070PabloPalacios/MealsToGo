import React, { useContext} from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { FavouriteContext, FavouritesContext } from "../../services/favourites/favourites.context";

export const Favourite = ({ restaurant }) => {

    const { favourites, addToFavourites, removeFavourites } = useContext(FavouritesContext);
    //Esto nos indica si existe en el array de lugares favoritos
    const isFavourite = favourites.find((r) => r.placeId === restaurant.placeId);
    console.log(favourites.length);

    return(
        <FavouriteButton
        onPress={() => !isFavourite ? addToFavourites(restaurant)
        : removeFavourites(restaurant)}
        >
            <AntDesign
            name={
                isFavourite ? "heart" : "hearto"
            }
            size={24}
            color={
                isFavourite ? "red": "white"
            }
            />
        </FavouriteButton>
    );
}

const FavouriteButton = styled(TouchableOpacity)`
    position: absolute;
    top: 25px;
    right: 25px;
    z-index: 9;
`;