import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const ListeF = () => {
  const route = useRoute();
  const { client_id } = route.params;
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const api = `http://10.0.2.2:8000/api/facture/${client_id}`;

  const fetchFacture = async () => {
    const response = await axios.get(api);
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['facture', client_id],
    queryFn: fetchFacture,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`http://10.0.2.2:8000/api/facture/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facture', client_id] });
    },
    onError: (error) => {
      console.error('Erreur lors de la suppression :', error);
      Alert.alert("Erreur", "Impossible de supprimer la facture.");
    },
  });

  const confirmDelete = (id) => {
    Alert.alert(
      "Confirmer la suppression",
      "Voulez-vous vraiment supprimer cette facture ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => deleteMutation.mutate(id),
        }
      ]
    );
  };

  if (isLoading) return <ActivityIndicator style={{ marginTop: 40 }} />;
  if (isError) return <Text style={{ marginTop: 40 }}>Erreur lors du chargement.</Text>;

  return (
    <View style={{ padding: 40 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>← Back</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('createF', { client_id })}>
        <Text style={{ marginBottom: 10, color: 'green' }}>Create</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Factures du client #{client_id}</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
            <Text style={{ flex: 1 }}>{item.num}</Text>
            <Text style={{ flex: 1 }}>{item.date}</Text>

            <TouchableOpacity onPress={() => navigation.navigate('editF', { facture: item })}>
              <Text style={{ color: 'blue', marginRight: 10 }}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => confirmDelete(item.id)}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default ListeF;