import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';

const API_KEY = '4b00c2d4c87b870452b613c694f57a91';

export default function MovieDetails() {
    const { id } = useLocalSearchParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
                setMovie(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovieDetails();
    }, [id]);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-black">
                <ActivityIndicator size="large" color="#21d07a" />
            </View>
        );
    }

    if (!movie) {
        return (
            <View className="flex-1 justify-center items-center bg-black">
                <Text className="text-white">Movie not found</Text>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-black">
            {/* Back Button */}
            <TouchableOpacity 
                className="absolute top-14 left-4 z-10 bg-black/50 rounded-full p-2"
                onPress={() => router.back()}
            >
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            {/* Movie Poster */}
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                className="w-full h-96"
            />

            {/* Movie Details */}
            <View className="p-6">
                <Text className="text-white text-2xl font-bold mb-2">{movie.title}</Text>
            
                {/* Rating */}
                <View className="flex-row items-center mb-4">
                    <View className="bg-[#21d07a] rounded-full w-10 h-10 justify-center items-center mr-2">
                        <Text className="text-black font-bold">{movie.vote_average.toFixed(1)}</Text>
                    </View>
                    <Text className="text-white">User Score</Text>
                </View>

                {/* Basic Info */}
                <Text className="text-[#21d07a] mb-2">{movie.release_date} • {movie.runtime} minutes</Text>

                {/* Genres */}
                <View className="flex-row flex-wrap mb-4">
                    {movie.genres?.map(genre => (
                        <Text key={genre.id} className="text-white bg-[#333] rounded-full px-3 py-1 mr-2 mb-2">
                            {genre.name}
                        </Text>
                    ))}
                </View>

                {/* Overview */}
                <Text className="text-white text-lg mb-2">Overview</Text>
                <Text className="text-gray-400 mb-6">{movie.overview}</Text>
            </View>
        </ScrollView>
    );
}