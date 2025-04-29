import { View, Text, Image, FlatList, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';

const API_KEY = process.env.EXPO_PUBLIC_MOVIE_API_KEY;

export default function MoviesScreen() {
  const [draftQuery, setDraftQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const url = searchQuery.trim()
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [searchQuery]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#21d07a" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-red-600">Error: {error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <Image source={images.bg} className="absolute w-full z-0" resizeMode="cover" />
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <SearchBar
          placeholder="Search for a movie"
          value={draftQuery}
          onChangeText={setDraftQuery}
          onPress={() => setSearchQuery(draftQuery)}
        />

        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => {
            setDraftQuery("");
            setSearchQuery("");
          }}>
            <Text className="text-blue-400 text-sm mt-2">Clear Search</Text>
          </TouchableOpacity>
        )}

        <Text className="font-bold my-3 text-white">
          {searchQuery ? "Search Results" : "Latest Movies"}
        </Text>

        {movies.length === 0 ? (
          <Text className="text-white text-center my-5">No movies found.</Text>
        ) : (
          <FlatList
            data={movies}
            renderItem={({ item }) => <MovieCard movie={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            contentContainerClassName="pb-5"
            showsVerticalScrollIndicator={false}
            className="mt-2 pb-32"
          />
        )}
      </ScrollView>
    </View>
  );
}