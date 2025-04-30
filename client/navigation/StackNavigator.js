import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screen/Home';
import MovieDetail from '../screen/MovieDetail';
import Liste from '../screen/Api/Liste';
import Create from '../screen/Api/Create';
import Edit from '../screen/Api/Edit';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: 'white' }
            }}
        >
            <Stack.Screen name="liste" component={Liste} />
            <Stack.Screen name="create" component={Create} />
            <Stack.Screen name="edit" component={Edit} />
            
            {/* <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="MovieDetail" component={MovieDetail} /> */}
        </Stack.Navigator>
    );
}