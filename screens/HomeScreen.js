import React, { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Text } from "react-native";



import { Background, Logo, Header, Paragraph, Button } from "../components";

const HomeScreen = ({ navigation }) => {
  const [isLogin, setisLogin] = useState(true);
  useEffect(async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      const token = await SecureStore.getItemAsync('idToken');
      if (user && (token != null && token != '')) {
        if (token != null && token != '') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Tab' }],
          })
        }
      } else {
        await SecureStore.setItemAsync('idToken', '');
        setisLogin(false);
      }
    });
  }, []);

  return (<>
    {isLogin == false ? (
      <Background>
        <Logo />
        <Header>Login Template</Header>
        <Paragraph>
          The easiest way to start with your amazing application.
        </Paragraph>
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate('Login')
          }
        >
          Login
        </Button>
        <Button
          mode="outlined"
          onPress={() =>
            navigation.navigate('Register')
          }
        >
          Sign Up
        </Button>
      </Background>
    ) : (
      <Background><Text>Loading</Text></Background>
    )}
  </>
  );
};


export default HomeScreen;
