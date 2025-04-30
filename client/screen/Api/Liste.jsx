import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

// Use 10.0.2.2 for Android emulator
const api = 'http://10.0.2.2:8000/api/client';

const Liste = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const fetchData = async () => {
        try {
            const response = await axios.get(api);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (id) => {
        Alert.alert(
            "Confirmer la suppression",
            "Voulez-vous vraiment supprimer ce client ?",
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await axios.delete(`${api}/${id}`);
                            // Met à jour la liste
                            fetchData();
                        } catch (error) {
                            console.error('Erreur lors de la suppression:', error);
                            Alert.alert("Erreur", "Impossible de supprimer le client.");
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={{ padding: 40 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <Text style={{ marginBottom: 10, color: 'green' }}>Create</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Liste des clients</Text>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                        <Text style={{ flex: 1 }}>{item.prenom} ({item.nom})</Text>
                        <Text style={{ flex: 1 }}>{item.tel}</Text>

                        <TouchableOpacity onPress={() => navigation.navigate('Edit', { client: item })}>
                            <Text style={{ color: 'blue', marginRight: 10 }}>Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleDelete(item.id)}>
                            <Text style={{ color: 'red' }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

export default Liste;