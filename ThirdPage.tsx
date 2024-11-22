import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './HomePage';
import MainPage from './MainPage';
import ThirdPage from './ThirdPage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [meals, setMeals] = useState([]); // Manage meals state here

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Home Page */}
        <Stack.Screen name="Home">
          {props => <HomePage {...props} meals={meals} />}
        </Stack.Screen>

        {/* Main Page */}
        <Stack.Screen name="MainPage">
          {props => (
            <MainPage 
              {...props} 
              meals={meals} 
              setMeals={setMeals} 
            />
          )}
        </Stack.Screen>

        {/* Third Page */}
        <Stack.Screen name="ThirdPage">
          {props => <ThirdPage {...props} meals={meals} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}