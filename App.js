import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Matches, Messages, MyProfile } from "./screens";
import { PRIMARY_COLOR, DARK_GRAY, BLACK, WHITE } from "./assets/styles";
import TabBarIcon from "./components/TabBarIcon";
import { Login, Register, ResetPassword, HomeScreen } from "./screens";
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();  //Ignore all log notifications

const isLogin = true;
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen
          name="Tab"
          options={{ headerShown: false, animationEnabled: false }}
        >
          {() => (
            <Tab.Navigator
              tabBarOptions={{
                showLabel: false,
                activeTintColor: PRIMARY_COLOR,
                inactiveTintColor: DARK_GRAY,
                labelStyle: {
                  fontSize: 14,
                  textTransform: "uppercase",
                  paddingTop: 10,
                },
                style: {
                  backgroundColor: WHITE,
                  borderTopWidth: 0,
                  marginBottom: 0,
                  shadowOpacity: 0.05,
                  shadowRadius: 10,
                  shadowColor: BLACK,
                  shadowOffset: { height: 0, width: 0 },
                },
              }}
            >
              <Tab.Screen
                name="Explore"
                component={Home}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <TabBarIcon
                      focused={focused}
                      iconName="search"
                      text="Explore"
                    />
                  ),
                }}
              />

              <Tab.Screen
                name="Matches"
                component={Matches}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <TabBarIcon
                      focused={focused}
                      iconName="heart"
                      text="Matches"
                    />
                  ),
                }}
              />

              <Tab.Screen
                name="Chat"
                component={Messages}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <TabBarIcon
                      focused={focused}
                      iconName="chatbubble"
                      text="Chat"
                    />
                  ),
                }}
              />

              <Tab.Screen
                name="Profile"
                component={MyProfile}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <TabBarIcon
                      focused={focused}
                      iconName="person"
                      text="Profile"
                    />
                  ),
                }}
              />
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );


};

export default App;
