import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { icons } from '@/constants/icons';

const MovieCard = ({ movie, onPress }) => {

  return (
    <Link href={`/movies/${movie.id}`} asChild>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.poster}
          resizeMode="cover"
        />
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
          <View style={styles.ratingContainer} className='flex-row items-center justify-start gap-x-1' >
            <Image source={icons.star} />
            <Text className='text-white'>{Math.round(movie.vote_average / 2)}</Text>
          </View>
          <Text style={styles.date} className='text-white'>{movie.release_date}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
    width: 160,
    elevation: 5,
  },
  poster: {
    width: '100%',
    height: 240,
  },
  details: {
    padding: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  ratingContainer: {
    position: 'relative',
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  ratingCircle: {
    position: 'absolute',
  },

});

export default MovieCard;