import { Image, ImageBackground, Text, View } from "react-native";
import "./global.css";
import { splashBg, splashHero } from "@/assets/icons";
import CustomButton from "@/components/CustomButton";
import { ArrowRight } from "lucide-react-native";
import { useEffect } from "react";
import { router } from "expo-router";

export default function Index() {
  const isAuthenticated = true;
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isAuthenticated) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)");
      }
    }, 1500);
    return () => clearTimeout(timeout);
  }, [isAuthenticated]);
  return (
    <ImageBackground
      source={splashBg}
      className="flex-1 w-full h-full"
      resizeMode="cover"
    >
      {/* 🔝 Top Text */}
      <View className="mt-32 items-center gap-2">
        <Text className="text-white font-Poppins-ExtraBold text-4xl text-center">
          Welcome to MindMate
        </Text>
        <Text className="text-white font-Poppins-Medium text-lg text-center">
          Build better habits. Understand your mood. Live better.
        </Text>
      </View>

      {/* 🖼 Middle Image */}
      <View className="flex-1 items-center justify-center">
        <Image
          source={splashHero}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
    </ImageBackground>
  );
}
