import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const api = 'http://10.0.2.2:8000/api/facture';

const EditF = ({ route, navigation }) => {
  const { facture } = route.params;
  const queryClient = useQueryClient();

  const [num, setNum] = useState(facture.num || '');
  const [date, setDate] = useState(facture.date || '');

  const { mutate, isPending } = useMutation({
    mutationFn: async (updatedFacture) => {
      const response = await axios.put(`${api}/${facture.id}`, updatedFacture);
      return response.data;
    },
    onSuccess: () => {
      Alert.alert('Succès', 'Facture mise à jour avec succès');
      queryClient.invalidateQueries({ queryKey: ['facture', facture.client_id] });
      navigation.goBack();
    },
    onError: (error) => {
      console.error(error);
      Alert.alert('Erreur', "La mise à jour a échoué");
    }
  });

  const handleUpdate = () => {
    if (!num || !date) {
      Alert.alert('Erreur', 'Tous les champs sont requis');
      return;
    }

    mutate({ num, date, client_id: facture.client_id });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Modifier la facture</Text>

      <TextInput
        value={num}
        onChangeText={setNum}
        style={styles.input}
      />

      <TextInput
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />

      <Button title={isPending ? "Mise à jour..." : "Update"} onPress={handleUpdate} disabled={isPending} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default EditF;