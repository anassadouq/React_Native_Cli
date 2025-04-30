import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

// ⚠ Use 10.0.2.2 for Android emulator
const api = 'http://10.0.2.2:8000/api/client';

const Create = ({ navigation }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [tel, setTel] = useState('');

  const handleSubmit = async () => {
    if (!nom || !prenom || !tel) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    try {
      await axios.post(api, {
        nom,
        prenom,
        tel,
      });
      Alert.alert('Succès', 'Client ajouté avec succès');
      navigation.goBack(); // Retour à la page précédente (liste)
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', "Impossible d'ajouter le client");
    }
  };

  return (
    <View style={styles.container}>
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

      <Button title="Create" onPress={handleSubmit} />
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