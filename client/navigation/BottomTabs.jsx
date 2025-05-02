import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/Movies/Movies';
import Liste from '../screen/Crud/Client/ListeC';
import { icons } from '../constants/icons';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconSource;

                    if (route.name === 'Movies') iconSource = icons.home;
                    else if (route.name === 'Clients') iconSource = icons.person;

                    return (
                        <Image
                            source={iconSource}
                            style={{ width: size, height: size, tintColor: color }}
                            resizeMode="contain"
                        />
                    );
                },
                tabBarActiveTintColor: '#000',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Movies" component={Home} />
            <Tab.Screen name="Clients" component={Liste} />
        </Tab.Navigator>
    );
}