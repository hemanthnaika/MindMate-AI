import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Hero } from "@/assets/icons";
import CustomButton from "@/components/CustomButton";
import {
  ArrowRight,
  BrainCircuit,
  CircleDashed,
  LucideIcon,
  Microscope,
  ShieldCheck,
  Sparkles,
} from "lucide-react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const InfoCard = ({
  title,
  descripton,
  icon,
}: {
  title: string;
  descripton: string;
  icon: LucideIcon;
}) => {
  const Icon = icon;
  return (
    <View className="bg-neutral/90 p-10 rounded-md flex-col gap-3 mt-5">
      <Icon size={25} color="#76A1B5" />
      <Text className="text-white font-Plus-Bold text-2xl font-extrabold">
        {title}
      </Text>
      <Text className="text-white font-Plus-Regular text-lg">{descripton}</Text>
    </View>
  );
};
const Index = () => {
  return (
    <SafeAreaView className="bg-secondary flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-10">
        <Image
          source={Hero}
          className="w-full   rounded-md mt-5 h-96 object-cover"
          resizeMode="cover"
        />

        <Text className="text-white text-5xl font-Plus-Bold mt-5">
          Your mind is a <Text className="text-primary">sanctuary.</Text>
        </Text>
        <Text className="text-white font-Plus-Medium mt-5 text-lg">
          In a world that never stops moving, we help you find your quiet
          center. Experience empathetic AI companions designed for your mental
          flourishing
        </Text>
        <View className="flex-row gap-5 items-center justify-start mt-5">
          <View className="flex-row bg-neutral/90  gap-2 items-center rounded-md shadow px-5 py-2">
            <Sparkles size={10} color="#fff" />
            <Text className="text-white font-Plus-Regular">
              Empathetic Chat
            </Text>
          </View>

          <View className="flex-row bg-neutral/90  gap-2 items-center rounded-md shadow px-5 py-2 ">
            <Microscope size={10} color="#fff" />
            <Text className="text-white font-Plus-Regular">Mood Science</Text>
          </View>
        </View>

        <CustomButton
          title="Start your journey"
          icon={ArrowRight}
          onPress={() => router.push("/(auth)/sign-up")}
          style="mt-10"
        />
        <CustomButton
          title="   Already a member?"
          onPress={() => router.push("/(auth)/sign-in")}
          style="mt-5 bg-neutral/90  mb-10"
          textStyle="text-white"
        />
        <InfoCard
          title="Private &amp; Secure"
          descripton="Your data is encrypted and stays between you and your AI companion. Sanctuary means safety."
          icon={ShieldCheck}
        />

        <InfoCard
          title="Evidence Based"
          descripton="Built using established cognitive behavioral principles and latest AI alignment research."
          icon={BrainCircuit}
        />

        <InfoCard
          title="Daily Growth"
          descripton="Gentle nudges and habit tracking to help you maintain emotional resilience every day."
          icon={CircleDashed}
        />
        <Text className="text-white mt-5  text-center mb-10 font-Plus-Bold">
          © {new Date().getFullYear()} MindMate-AI
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
