import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CreateDetailFacture = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { facture_id } = route.params;

  const [designation, setDesignation] = useState('');
  const [qte, setQte] = useState('');
  const [pu, setPu] = useState('');

  const queryClient = useQueryClient();

  const { mutate, isPending }  = useMutation({
    mutationFn: (newDetailFacture) =>
    axios.post('http://10.0.2.2:8000/api/detail_facture', newDetailFacture),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['detail_facture', facture_id] });
      navigation.goBack();
    },
    onError: (error) => {
      console.error('Erreur complète :', error.response?.data || error.message);
      Alert.alert('Erreur', 'Impossible de créer le detail');
    },
  });

  const handleSubmit = () => {
    if (!designation || !qte || !pu) {
      Alert.alert('Champs manquants', 'Veuillez remplir tous les champs.');
      return;
    }

    mutate({ designation, qte, pu, facture_id });
  };

  return (
    <View style={{ padding: 40 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>← Back</Text>
      </TouchableOpacity>

      <Text>Créer une facture pour le client #{facture_id}</Text>

      <TextInput
        placeholder="Designation"
        value={designation}
        onChangeText={setDesignation}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Qte"
        value={qte}
        onChangeText={setQte}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Pu"
        value={pu}
        onChangeText={setPu}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Button title={isPending ? "Création en cours..." : "Create"} onPress={handleSubmit} disabled={isPending} />
      
    </View>
  );
};

export default CreateDetailFacture;