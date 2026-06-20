import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

// Screens Imports
import SplashScreen from './screens/SplashScreen'; 
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import UpdatesScreen from './screens/UpdatesScreen'; 
import CallsScreen from './screens/CallsScreen';    
import CommunitiesScreen from './screens/CommunitiesScreen';
import MetaAiScreen from './screens/MetaAiScreen'; 
import ChatScreen from './screens/ChatScreen'; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#25D366',
        tabBarInactiveTintColor: '#667781',
        tabBarStyle: {
          height: 60,
          borderTopWidth: 1,
          borderTopColor: '#E9EDEF',
          paddingBottom: 5,
          backgroundColor: '#ffffff',
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins_500Medium',
          fontSize: 12,
          marginBottom: 2,
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName: any = '';

          if (route.name === 'Chats') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Updates') {
            iconName = focused ? 'aperture' : 'aperture-outline';
          } else if (route.name === 'Communities') {
            iconName = focused ? 'people' : 'people-outline'; 
          } else if (route.name === 'Calls') {
            iconName = focused ? 'call' : 'call-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Chats" component={HomeScreen} />
      <Tab.Screen name="Updates" component={UpdatesScreen} />
      <Tab.Screen name="Communities" component={CommunitiesScreen} /> 
      <Tab.Screen name="Calls" component={CallsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isShowSplash ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : (
          <Stack.Group>
            {/* Main Application Tab Flow */}
            <Stack.Screen name="Main" component={MainTabs} />
            
            <Stack.Screen 
              name="MetaAi" 
              component={MetaAiScreen} 
              options={{
                animationEnabled: true, 
              }}
            />
 
            <Stack.Screen 
              name="Chat" 
              component={ChatScreen} 
              options={{
                animationEnabled: true, 
              }}
            />
            
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen} 
              options={{ 
                headerShown: true, 
                title: 'Settings',
                headerTitleStyle: { fontFamily: 'Poppins_600SemiBold' },
                headerTintColor: '#111B21',
              }} 
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}