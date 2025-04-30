import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_KEY = '4b00c2d4c87b870452b613c694f57a91';

export default function MovieDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { movieId } = route.params;

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetail();
  }, [movieId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#21d07a" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFoundText}>Movie not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />

      <View style={styles.details}>
        <Text style={styles.title}>{movie.title}</Text>

        <View style={styles.ratingRow}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreText}>{movie.vote_average.toFixed(1)}</Text>
          </View>
          <Text style={styles.userScoreLabel}>User Score</Text>
        </View>

        <Text style={styles.basicInfo}>
          {movie.release_date} • {movie.runtime} minutes
        </Text>

        <View style={styles.genresRow}>
          {movie.genres?.map((genre) => (
            <Text key={genre.id} style={styles.genreBadge}>
              {genre.name}
            </Text>
          ))}
        </View>

        <Text style={styles.sectionHeader}>Overview</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  notFoundText: { color: '#fff' },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  poster: { width: '100%', height: 350 },
  details: { padding: 16 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  scoreCircle: {
    backgroundColor: '#21d07a',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  scoreText: { color: '#000', fontWeight: 'bold' },
  userScoreLabel: { color: '#fff' },
  basicInfo: { color: '#21d07a', marginBottom: 12 },
  genresRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  genreBadge: {
    color: '#fff',
    backgroundColor: '#333',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  sectionHeader: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  overview: { color: '#aaa', lineHeight: 20 },
});