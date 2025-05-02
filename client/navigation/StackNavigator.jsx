import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieDetail from '../screen/Movies/MovieDetail';
import BottomTabs from './BottomTabs';

// Client
import ListeC from '../screen/Crud/Client/ListeC';
import CreateC from '../screen/Crud/Client/CreateC';
import EditC from '../screen/Crud/Client/EditC';

// Facture
import ListeF from '../screen/Crud/Facture/ListeF';
import CreateF from '../screen/Crud/Facture/CreateF';
import EditF from '../screen/Crud/Facture/EditF';

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

            {/*  Client */}
            <Stack.Screen name="listeC" component={ListeC} />
            <Stack.Screen name="createC" component={CreateC} />
            <Stack.Screen name="editC" component={EditC} />

            {/*  Facture */}
            <Stack.Screen name="listeF" component={ListeF} />
            <Stack.Screen name="createF" component={CreateF} />
            <Stack.Screen name="editF" component={EditF} />
        </Stack.Navigator>
    );
}