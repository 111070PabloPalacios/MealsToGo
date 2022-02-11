import React from "react";
import { TouchableOpacity, Platform, Image } from "react-native";
import { WebView } from "react-native-webview";
import { Text } from "../typography/text.component";
import styled from "styled-components/native";

const isAndroid = Platform.OS === "android";

export const CompactRestaurantInfo = ({ restaurant, isMap }) => {

    //esto hace que la image sea tanto renderizable en iOS como en android. Es necesario
    //ya que el componente CompactImage ocasiona un bug en android, pero funciona bien en iOS
    const Image = isAndroid && isMap ? CompactWebview : CompactImage;

    return(
        <Item>
            <Image source={{ uri: restaurant.photos[0]}} />
            <Text center variant="caption">
                {restaurant.name}
            </Text>
        </Item>
    );
}

const CompactImage = styled.Image`
    border-radius: 10px;
    width: 120px;
    height: 100px;
`;

const Item = styled.View`
    padding: 10px;
    max-width: 120px;
    align-items: center;
`;

const CompactWebview = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;