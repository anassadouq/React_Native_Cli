import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CreateF = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { client_id } = route.params;

  const [num, setNum] = useState('');
  const [date, setDate] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newFacture) =>
      axios.post('http://10.0.2.2:8000/api/facture', newFacture),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['facture', client_id] });
        navigation.goBack();
      },
      onError: (error) => {
        console.error('Erreur complète :', error.response?.data || error.message);
        Alert.alert('Erreur', 'Impossible de créer la facture');
      },
    });

    const handleSubmit = () => {
      if (!num || !date) {
        Alert.alert('Champs manquants', 'Veuillez remplir tous les champs.');
        return;
      }

      mutation.mutate({ num, date, client_id });
    };

    return (
      <View style={{ padding: 40 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>← Back</Text>
        </TouchableOpacity>

        <Text>Créer une facture pour le client #{client_id}</Text>

        <TextInput
          placeholder="Numéro de facture"
          value={num}
          onChangeText={setNum}
          style={{ borderWidth: 1, marginBottom: 10 }}
        />

      <TextInput
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <TouchableOpacity onPress={handleSubmit} disabled={mutation.isPending}>
        <Text style={{ color: mutation.isPending ? 'gray' : 'green' }}>
          {mutation.isPending ? 'Création...' : 'Créer'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateF;