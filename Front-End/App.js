import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Components/HomeScreen';
import SettingScreen from './Components/SettingScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home" 
        screenOptions={{ headerShown: false }} // Hide header for all screens
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;