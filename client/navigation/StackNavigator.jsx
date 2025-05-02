import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieDetail from '../screen/Movies/MovieDetail';
import BottomTabs from './BottomTabs';
import Liste from '../screen/Crud/Liste';
import Create from '../screen/Crud/Create';
import Edit from '../screen/Crud/Edit';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: 'white' }
            }}
        >            
            <Stack.Screen name="Main" component={BottomTabs} />
            <Stack.Screen name="MovieDetail" component={MovieDetail} /> 
            <Stack.Screen name="liste" component={Liste} />
            <Stack.Screen name="create" component={Create} />
            <Stack.Screen name="edit" component={Edit} />   
        </Stack.Navigator>
    );
}