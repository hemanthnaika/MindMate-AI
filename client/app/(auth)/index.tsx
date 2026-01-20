import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import { splashBg, splashHero } from "@/assets/icons";
import CustomButton from "@/components/CustomButton";
import { ArrowRight } from "lucide-react-native";
import { router } from "expo-router";

const Index = () => {
  return (
    <ImageBackground
      source={splashBg}
      className="flex-1 w-full h-full"
      resizeMode="cover"
    >
      <View className="flex-1 px-5">
        <View className="mt-32 items-center gap-2">
          <Text className="text-white font-Poppins-ExtraBold text-4xl text-center">
            Welcome to MindMate
          </Text>
          <Text className="text-white font-Poppins-Medium text-lg text-center">
            Build better habits. Understand your mood. Live better.
          </Text>
        </View>

        <View className="flex-1 items-center justify-center">
          <Image
            source={splashHero}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>

        <View className="mb-10 ">
          <CustomButton
            title="Start my Journey"
            icon={ArrowRight}
            onPress={() => router.push("/(auth)/sign-in")}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Index;
