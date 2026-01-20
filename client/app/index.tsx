import { Image, ImageBackground, Text, View } from "react-native";
import "./global.css";
import { splashBg, splashHero } from "@/assets/icons";
import CustomButton from "@/components/CustomButton";
import { ArrowRight } from "lucide-react-native";

export default function Index() {
  return (
    <ImageBackground
      source={splashBg}
      className="flex-1 w-full h-full"
      resizeMode="cover"
    >
      <View className="flex-1 px-5">
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

        {/* 🔘 Bottom Button */}
        <View className="mb-10 items-center">
          <CustomButton title="Start my Journey" icon={ArrowRight} />
        </View>
      </View>
    </ImageBackground>
  );
}
