import {View, Text, Image} from 'react-native';
import React from 'react';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';

function profile() {
  return (
    <View className='flex-1 bg-black'>
      <Image source={images.bg} className="absolute w-full z-0" resizeMode="cover" />
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      <Text className='flex items-center justify-center h-screen text-white font-bold text-2xl'>Profile</Text>
    </View>
  )
}

export default profile