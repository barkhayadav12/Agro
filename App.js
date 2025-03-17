import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import FeaturesScreen from './screens/FeaturesScreen';
import ChatScreen from './screens/ChatScreen';
import DiseaseDetection from './screens/DiseaseDetection';
import CropRecommendation from './screens/CropRecommendation';
import FertilizerRecommendation from './screens/FertilizerRecommendation';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Features
const FeaturesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FeaturesMain" component={FeaturesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DiseaseDetection" component={DiseaseDetection} options={{ title: 'Disease Detection' }} />
      <Stack.Screen name="CropRecommendation" component={CropRecommendation} options={{ title: 'Crop Recommendation' }} />
      <Stack.Screen name="FertilizerRecommendation" component={FertilizerRecommendation} options={{ title: 'Fertilizer Recommendation' }} />    
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Features') iconName = 'apps';
            else if (route.name === 'Chat') iconName = 'chatbubbles';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2E8B57',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Features" component={FeaturesStack} />
        <Tab.Screen name="Chat" component={ChatScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
