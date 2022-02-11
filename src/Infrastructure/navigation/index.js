import React, { useContext } from "react";
import { View, Text } from "react-native";
import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from './account.navigator';
import { NavigationContainer } from "@react-navigation/native";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const Navigation = () => {

    const { isAuthenticated } = useContext(AuthenticationContext);
    //al principio dejar esto solamente como <AppNavigator/>
    //agregar la logica del isAuthenticated cuando se empiece a trabajar en el login

    return (
        <NavigationContainer>
            {isAuthenticated ? <AppNavigator/> : <AccountNavigator/>}
        </NavigationContainer>  
    );
}