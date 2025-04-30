import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

// ⚠ Use 10.0.2.2 for Android emulator
const apiBase = 'http://10.0.2.2:8000/api/client';

const Edit = ({ route, navigation }) => {
  const { client } = route.params;

  const [nom, setNom] = useState(client.nom);
  const [prenom, setPrenom] = useState(client.prenom);
  const [tel, setTel] = useState(client.tel);

  const handleUpdate = async () => {
    if (!nom || !prenom || !tel) {
      Alert.alert('Erreur', 'Tous les champs sont requis');
      return;
    }

    try {
      await axios.put(`${apiBase}/${client.id}`, {
        nom,
        prenom,
        tel,
      });
      Alert.alert('Succès', 'Client mis à jour avec succès');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', "La mise à jour a échoué");
    }
  };

  return (
    <View style={styles.container}>
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
        style={styles.input}
      />

      <Button title="Update" onPress={handleUpdate} />
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