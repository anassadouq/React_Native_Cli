import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screen/Home';
import MovieDetail from '../screen/MovieDetail';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: 'white' }
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="MovieDetail" component={MovieDetail} />
        </Stack.Navigator>
    );
}