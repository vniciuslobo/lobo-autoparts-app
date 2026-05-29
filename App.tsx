import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, SpaceGrotesk_400Regular, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';

import Inicio from './src/screens/Inicio';
import Produtos from './src/screens/Produtos';
import Perfil from './src/screens/Perfil';

const Tab = createBottomTabNavigator();

export default function App() {
  // Carregamento da fonte para o projeto
  const [fonteCarregada] = useFonts({
    'SpaceGrotesk-Regular': SpaceGrotesk_400Regular,
    'SpaceGrotesk-SemiBold': SpaceGrotesk_600SemiBold,
    'SpaceGrotesk-Bold': SpaceGrotesk_700Bold,
  });

  // Verifica se a fonte já carregou, se não, não exibe nada
  if (!fonteCarregada) {
    return <View />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'help-circle';

            if (route.name === 'Início') {
              iconName = 'home-outline';
            } else if (route.name === 'Produtos') {
              iconName = 'bag-outline';
            } else if (route.name === 'Perfil') {
              iconName = 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: {
            backgroundColor: '#1a2e4a',
            borderTopWidth: 0,
            paddingTop: 10
          },
          tabBarActiveTintColor: '#f57c00',
          tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
          tabBarLabelStyle: {
            fontFamily: 'SpaceGrotesk-Regular',
          },
        })}
      >
        <Tab.Screen name="Início" component={Inicio} />
        <Tab.Screen name="Produtos" component={Produtos} />
        <Tab.Screen name="Perfil" component={Perfil} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}