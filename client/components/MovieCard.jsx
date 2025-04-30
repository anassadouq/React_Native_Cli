import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function MovieCard({ movie, onPress }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#1c1c1c',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 8,
  },
  title: {
    color: 'white',
    fontSize: 14,
    padding: 6,
  },
});