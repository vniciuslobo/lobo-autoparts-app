import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Aqui está a importação oficial dos ícones que a professora pediu:
import { Ionicons } from '@expo/vector-icons'; 

import Inicio from './src/screens/Inicio';
import Produtos from './src/screens/Produtos';
import Perfil from './src/screens/Perfil'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          // Essa função escolhe o ícone certo para cada tela automaticamente
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'help-circle';

            if (route.name === 'Início') {
              iconName = 'home';
            } else if (route.name === 'Produtos') {
              iconName = 'hardware-chip'; // Ícone de processador/chip
            } else if (route.name === 'Perfil') {
              iconName = 'person';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF', // Cor do botão quando clicado
          tabBarInactiveTintColor: 'gray',   // Cor do botão quando desligado
        })}
      >
        <Tab.Screen name="Início" component={Inicio} />
        <Tab.Screen name="Produtos" component={Produtos} />
        <Tab.Screen name="Perfil" component={Perfil} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}