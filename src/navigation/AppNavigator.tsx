import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { Ionicons } from '@expo/vector-icons';


import HomeStack from "./HomeStack";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { TabParamList } from "./types";
import { useTheme } from "../theme/ThemeContext";

const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      id="RootTabs"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'bag' : 'bag-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen}
        options={{ title: 'Shopping Cart' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { theme } = useTheme();
  
  return (
    <NavigationContainer>
      <StatusBar 
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme === 'dark' ? '#000000' : '#ffffff'}
      />
      <TabNavigator />
    </NavigationContainer>
  );
}