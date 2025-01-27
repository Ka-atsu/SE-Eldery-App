import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Components/HomeScreen';
import SettingScreen from './Components/SettingScreen';
import EmergencyScreen from './Components/EmergencyScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home" 
        screenOptions={{ headerShown: false }} 
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingScreen} />
        <Stack.Screen name="Emergency" component={EmergencyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;