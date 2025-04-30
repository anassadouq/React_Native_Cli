import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const apiBase = 'http://10.0.2.2:8000/api/client';

const Edit = ({ route, navigation }) => {
  const { client } = route.params;

  const [nom, setNom] = useState(client.nom);
  const [prenom, setPrenom] = useState(client.prenom);
  const [tel, setTel] = useState(client.tel);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (updatedClient) => {
      const response = await axios.put(`${apiBase}/${client.id}`, updatedClient);
      return response.data;
    },
    onSuccess: () => {
      Alert.alert('Succès', 'Client mis à jour avec succès');
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      navigation.goBack();
    },
    onError: (error) => {
      console.error(error);
      Alert.alert('Erreur', "La mise à jour a échoué");
    }
  });

  const handleUpdate = () => {
    if (!nom || !prenom || !tel) {
      Alert.alert('Erreur', 'Tous les champs sont requis');
      return;
    }

    mutate({ nom, prenom, tel });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Modifier le client</Text>

      <TextInput
        placeholder="Prénom"
        value={prenom}
        onChangeText={setPrenom}
        style={styles.input}
      />

      <TextInput
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
        style={styles.input}
      />

      <TextInput
        placeholder="Téléphone"
        value={tel}
        onChangeText={setTel}
        keyboardType="phone-pad"
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

export default Edit;