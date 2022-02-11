import React from "react";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
} from "../components/account.styles";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Button } from 'react-native-paper';
import { Navigation } from "../../../Infrastructure/navigation";
import { LoginScreen } from "./login.screen";
//Pantalla de entrada, en donde el usuario elige si quiere registrarse o iniciar
//sesion

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
      <AccountContainer>
        <AuthButton icon='lock-open-outline' mode='contained'
        onPress={() => navigation.navigate("Login")}>
           Login
        </AuthButton>
        <Spacer size="large"/>
        <AuthButton icon='lock-open-outline' mode='contained'
        onPress={() => navigation.navigate("Register")}>
           Register
        </AuthButton>
        <Spacer/>
      </AccountContainer>
    </AccountBackground>
  );
};
