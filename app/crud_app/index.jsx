import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const api = 'http://localhost:3000/users';

const App = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);

  // Fetch data from the JSON server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Create a new user
  const handleCreate = async () => {
    const newUser = { name, email };
    try {
      const response = await axios.post(api, newUser);
      setData([...data, response.data]);
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Update an existing user
  const handleUpdate = async () => {
    if (editId && name && email) {
      const updatedUser = { name, email };
      try {
        const response = await axios.put(`${api}/${editId}`, updatedUser);
        const updatedData = data.map((user) =>
          user.id === editId ? response.data : user
        );
        setData(updatedData);
        setName('');
        setEmail('');
        setEditId(null);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  // Delete a user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/${id}`);
      const updatedData = data.filter((user) => user.id !== id);
      setData(updatedData);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Edit a user
  const handleEdit = (id) => {
    const user = data.find((user) => user.id === id);
    setName(user.name);
    setEmail(user.email);
    setEditId(id);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>CRUD App</Text>
      
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}/>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}/>

      <Button title={editId ? 'Update' : 'Create'} onPress={editId ? handleUpdate : handleCreate}/>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
            <Text style={{ flex: 1 }}>{item.name} ({item.email})</Text>
            <TouchableOpacity onPress={() => handleEdit(item.id)}>
              <Text style={{ color: 'blue' }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={{ color: 'red', marginLeft: 10 }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default App;