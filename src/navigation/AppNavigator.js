import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Categoryscreen from "../screens/Categoryscreen";
import PantProduct1 from "../screens/PantProduct1";
import ProductDetail from "../screens/ProductDetail"; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Category">
        <Stack.Screen name="Category" component={Categoryscreen} />
        <Stack.Screen name="Pant1" component={PantProduct1} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
