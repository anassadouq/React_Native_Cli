import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const DetailFacture = () => {
  const route = useRoute();
  const { facture_id } = route.params;
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const api = `http://10.0.2.2:8000/api/detail_facture/${facture_id}`;

  const fetchDetailFacture = async () => {
    const response = await axios.get(api);
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['detail_facture', facture_id],
    queryFn: fetchDetailFacture,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`http://10.0.2.2:8000/api/detail_facture/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['detail_facture', facture_id] });
    },
    onError: (error) => {
      console.error('Erreur lors de la suppression :', error);
      Alert.alert("Erreur", "Impossible de supprimer le detail.");
    },
  });

  const confirmDelete = (id) => {
    Alert.alert(
      "Confirmer la suppression",
      "Voulez-vous vraiment supprimer ça ?",
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

      <TouchableOpacity onPress={() => navigation.navigate('create_detail_facture', { facture_id })}>
        <Text style={{ marginBottom: 10, color: 'green' }}>Create</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Detail du facture #{facture_id}</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
            <Text style={{ flex: 1 }}>{item.designation}</Text>
            <Text style={{ flex: 1 }}>{item.qte}</Text>
            <Text style={{ flex: 1 }}>{item.pu}</Text>

            <TouchableOpacity onPress={() => navigation.navigate('edit_detail_facture', { detail_facture: item })}>
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

export default DetailFacture;