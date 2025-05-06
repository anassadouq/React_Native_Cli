import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const api = 'http://10.0.2.2:8000/api/client';

const fetchClients = async () => {
    const response = await axios.get(api);
    return response.data;
};

const Client = () => {
    const navigation = useNavigation();
    const queryClient = useQueryClient();

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['client'],
        queryFn: fetchClients,
    });

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
                            queryClient.invalidateQueries({ queryKey: ['client'] }); // rafraîchir la liste
                        } catch (error) {
                            console.error('Erreur lors de la suppression:', error);
                            Alert.alert("Erreur", "Impossible de supprimer le client.");
                        }
                    }
                }
            ]
        );
    };

    if (isLoading) return <ActivityIndicator style={{ marginTop: 40 }} />;
    if (isError) return <Text style={{ marginTop: 40 }}>Erreur lors du chargement.</Text>;

    return (
        <View style={{ padding: 40 }}>
            <TouchableOpacity onPress={() => navigation.navigate('create_client')}>
                <Text style={{ marginBottom: 10, color: 'green' }}>Create</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Liste des clients</Text>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('facture', { client_id: item.id })}>
                            <Text style={{ flex: 1 }}>{item.prenom} {item.nom}</Text>
                        </TouchableOpacity>


                        <Text style={{ flex: 1 }}>{item.tel}</Text>

                        <TouchableOpacity onPress={() => navigation.navigate('edit_client', { client: item })}>
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

export default Client;