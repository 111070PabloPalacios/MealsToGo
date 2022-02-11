import React, { useState, useContext } from "react";
import { BottomNavigation, TextInput, ActivityIndicator, Colors} from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  AuthInput,
} from "../components/account.styles";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const { onRegister, isLoading ,error } = useContext(AuthenticationContext);

  return (
    <AccountBackground>
      <AccountContainer>
        <AccountCover />
        <AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
        />
        <Spacer size="large" />
        <AuthInput
          label="Password"
          value={password}
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
          onChangeText={(p) => setPassword(p)}
        />
        <Spacer size="large" />
        <AuthInput
          label="Repeat Password"
          value={repeatedPassword}
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
          onChangeText={(p) => setRepeatedPassword(p)}
        />
        {error.length > 0 && (
          <Spacer>
            <Text variant="error">{error}</Text>
          </Spacer>
        )}
        <Spacer size="large" />
        {
          !isLoading ?         
          (<AuthButton
          icon="mail"
          mode="contained"
          onPress={() => onRegister(email,password,repeatedPassword)}
        >
          Register
        </AuthButton>)
        : (<ActivityIndicator animating={true} color={Colors.blue300}/>)
        }
        <Spacer size="large" />
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </AccountContainer>
    </AccountBackground>
  );
};
