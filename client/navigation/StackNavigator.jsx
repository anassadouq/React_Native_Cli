import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieDetail from '../screen/Movies/MovieDetail';
import BottomTabs from './BottomTabs';

// Client
import Client from '../screen/Crud/Client/Client';
import CreateClient from '../screen/Crud/Client/CreateClient';
import EditClient from '../screen/Crud/Client/EditClient';

// Facture
import Facture from '../screen/Crud/Facture/Facture';
import CreateFacture from '../screen/Crud/Facture/CreateFacture';
import EditFacture from '../screen/Crud/Facture/EditFacture';

// Detail Facture
import DetailFacture from '../screen/Crud/Detail_Facture/DetailFacture';
import CreateDetailFacture from '../screen/Crud/Detail_Facture/CreateDetailFacture';
import EditDetailFacture from '../screen/Crud/Detail_Facture/EditDetailFacture';

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
            <Stack.Screen name="client" component={Client} />
            <Stack.Screen name="create_client" component={CreateClient} />
            <Stack.Screen name="edit_client" component={EditClient} />

            {/*  Facture */}
            <Stack.Screen name="facture" component={Facture} />
            <Stack.Screen name="create_facture" component={CreateFacture} />
            <Stack.Screen name="edit_facture" component={EditFacture} />

            {/*  Detail Facture */}
            <Stack.Screen name="detail_facture" component={DetailFacture} />
            <Stack.Screen name="create_detail_facture" component={CreateDetailFacture} />
            <Stack.Screen name="edit_detail_facture" component={EditDetailFacture} />
        </Stack.Navigator>
    );
}