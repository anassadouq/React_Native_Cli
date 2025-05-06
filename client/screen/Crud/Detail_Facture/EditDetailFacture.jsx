import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const api = 'http://10.0.2.2:8000/api/detail_facture';

const EditF = ({ route, navigation }) => {
  const { detail_facture } = route.params;
  const queryClient = useQueryClient();

  const [designation, setDesignation] = useState(detail_facture.designation || '');
  const [qte, setQte] = useState(detail_facture.qte || '');
  const [pu, setPu] = useState(detail_facture.pu || '');

  const { mutate, isPending } = useMutation({
    mutationFn: async (updatedFacture) => {
      const response = await axios.put(`${api}/${detail_facture.id}`, updatedFacture);
      return response.data;
    },
    onSuccess: () => {
      Alert.alert('Succès', 'Detail mise à jour avec succès');
      queryClient.invalidateQueries({ queryKey: ['detail_facture', detail_facture.facture_id] });
      navigation.goBack();
    },
    onError: (error) => {
      console.error(error);
      Alert.alert('Erreur', "La mise à jour a échoué");
    }
  });

  const handleUpdate = () => {
    if (!designation || !qte || !pu) {
      Alert.alert('Erreur', 'Tous les champs sont requis');
      return;
    }

    mutate({ designation, qte, pu, facture_id: detail_facture.facture_id });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Modifier</Text>

      <TextInput
        value={designation}
        onChangeText={setDesignation}
        style={styles.input}
      />

      <TextInput
        value={qte}
        onChangeText={setQte}
        style={styles.input}
      />

      <TextInput
        value={pu}
        onChangeText={setPu}
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