import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

export type RootStackParamList = {
  HomeScreen: undefined;
  PreviewScreen: { photoUris: string[] };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }} >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: 'Camera Screen' }}
      />
    </Stack.Navigator>
  );
}
