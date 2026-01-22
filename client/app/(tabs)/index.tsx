import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ai, profile } from "@/assets/icons";
import { ArrowRight, Bell, Plus } from "lucide-react-native";
import cn from "clsx";
import CustomButton from "@/components/CustomButton";
import HabitCard from "@/components/HabitCard";
import { router } from "expo-router";
import { authClient } from "@/lib/auth-client";

const MoodCard = ({
  icon,
  onPress,
  mood = false,
}: {
  icon: string;
  onPress?: () => void;
  mood?: boolean;
}) => (
  <TouchableOpacity className={cn(mood && "bg-primary p-2 rounded-full")}>
    <Text className="text-4xl font-Poppins-Medium">{icon}</Text>
  </TouchableOpacity>
);

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";
  return "Good Night";
};

const Index = () => {
  const { data: session } = authClient.useSession();
  const greeting = getGreeting();
  return (
    <SafeAreaView edges={["top"]} className="px-5   flex-1 bg-secondary">
      <StatusBar barStyle="dark-content" hidden />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between">
          <View className="bg-primary p-1 rounded-full">
            <Image
              source={session?.user.image || profile}
              resizeMode="contain"
              className="w-10 h-10"
            />
          </View>

          <Bell size={24} color={"#fff"} />
        </View>
        <View className="mt-10">
          <Text className="font-Poppins-ExtraBold text-3xl text-white">
            👋 {greeting},
          </Text>
          <Text className="font-Poppins-ExtraBold text-4xl text-white ml-10 mt-2">
            {session?.user.name}
          </Text>
        </View>
        <View
          className="p-5 mt-5 rounded-md bg-card"
          style={{
            elevation: 0.5,
          }}
        >
          <Text className="font-Inter-Medium text-lg text-white">
            How are you feeling today?
          </Text>
          <View
            className="flex-row items-center justify-between gap-5 mt-3"
            style={{
              shadowColor: "#DDD9FF",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 10,
              elevation: 4,
            }}
          >
            <MoodCard icon="😞" mood />
            <MoodCard icon="😕" />
            <MoodCard icon="😕" />
            <MoodCard icon="🙂" />
            <MoodCard icon="😄" />
          </View>
        </View>

        <View
          className="bg-card mt-10 p-5 rounded-md flex-row items-center "
          style={{
            shadowColor: "#25123F",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 10,
            elevation: 4,
          }}
        >
          <View className="flex-1 gap-2">
            <Text className="text-2xl font-Poppins-ExtraBold text-white">
              MindMate AI
            </Text>
            <Text className="font-Inter-Medium text-md text-white">
              A safe place to talk, reflect, and feel supported — anytime.
            </Text>
            <TouchableOpacity
              className="bg-primary  p-4 flex-row justify-center items-center gap-3 rounded-full mt-3"
              onPress={() => router.push("/chatWithAi")}
            >
              <Text className="font-Inter-Bold text-white text-md">
                Start a Chat
              </Text>
              <ArrowRight size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Image source={ai} resizeMode="cover" className="size-52" />
        </View>
        <View className="my-5 gap-5">
          <View className="flex-row items-center justify-between">
            <Text className="font-Inter-Bold text-xl text-white">
              Daily Habits
            </Text>
            <TouchableOpacity className="bg-primary  px-5 py-3 flex-row justify-center items-center gap-2 rounded-full">
              <Text className="font-Inter-Bold text-white text-sm  ">
                Add Habits
              </Text>
              <Plus size={15} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="font-Inter-Medium text-lg text-white">
            Check off what you’ve completed today
          </Text>
          <HabitCard />
          <HabitCard />
          <HabitCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
