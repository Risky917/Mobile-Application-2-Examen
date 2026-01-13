import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductListScreen from "../screens/ProductListScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import { HomeStackParamList } from "./types";
import { useTheme } from "../theme/ThemeContext";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      id="HomeStack"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackVisible: true,
      }}
    >
      <Stack.Screen 
        name="ProductList" 
        component={ProductListScreen}
        options={{ title: 'Products' }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={{ title: 'Product Details' }}
      />
    </Stack.Navigator>
  );
}