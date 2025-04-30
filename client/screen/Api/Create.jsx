import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const api = 'http://10.0.2.2:8000/api/client';

const Create = ({ navigation }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [tel, setTel] = useState('');

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (newClient) => {
      const response = await axios.post(api, newClient);
      return response.data;
    },
    onSuccess: () => {
      Alert.alert('Succès', 'Client ajouté avec succès');
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      navigation.goBack(); // Retour à la liste
    },
    onError: (error) => {
      console.error(error);
      Alert.alert('Erreur', "Impossible d'ajouter le client");
    }
  });

  const handleSubmit = () => {
    if (!nom || !prenom || !tel) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    mutate({ nom, prenom, tel });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Ajouter un nouveau client</Text>

      <TextInput
        placeholder="Prenom"
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
        placeholder="Tel"
        value={tel}
        onChangeText={setTel}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <Button title={isPending ? "Création en cours..." : "Create"} onPress={handleSubmit} disabled={isPending} />
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

export default Create;