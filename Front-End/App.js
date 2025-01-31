import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Components/HomeScreen';
import SettingScreen from './Components/SettingScreen';
import EmergencyScreen from './Components/EmergencyScreen';
import LoginScreen from './Components/login';
import ProfileScreen from './Components/ProfileScreen';
import GetStartedScreen from './Components/GetStartedScreen';
import HelpScreen from './Components/HelpScreen';
import { LogBox } from 'react-native'; // Import LogBox
const Stack = createNativeStackNavigator();

// Ignore specific warning
LogBox.ignoreLogs([
  'Warning: Text strings must be rendered within a <Text> component'
]);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="GetStarted" 
        screenOptions={{ headerShown: false }} 
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="Settings" component={SettingScreen} />
        <Stack.Screen name="Emergency" component={EmergencyScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;