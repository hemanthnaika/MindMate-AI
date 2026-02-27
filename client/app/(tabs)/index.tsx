import { ai, logo, profile } from "@/assets/icons";
import cn from "clsx";
import { ArrowRight, Bell, Plus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HabitCard from "@/components/HabitCard";
import { moodIcons, sleepIcons, stressIcons } from "@/constants";
import { authClient } from "@/lib/auth-client";
import { getHabits } from "@/services/habits.services";
import { addMood, getMood } from "@/services/mood.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { toast } from "sonner-native";

const Card = ({
  icon,
  onPress,
  active = false,
}: {
  icon: string;
  onPress?: () => void;
  active?: boolean;
}) => (
  <TouchableOpacity
    className={cn(
      "w-14 h-14 rounded-full items-center justify-center",
      active ? "bg-primary" : "bg-secondary/40",
    )}
    onPress={onPress}
  >
    <Text className="text-3xl">{icon}</Text>
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
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["habits"],
    queryFn: getHabits,
  });

  const [mood, setMood] = useState(1);
  const [sleep, setSleep] = useState(1);
  const [stress, setStress] = useState(1);

  const habits = data?.habits || [];
  const incompleteHabits = habits.filter((h: any) => !h.completed);
  const firstFive = incompleteHabits.slice(0, 5);
  const greeting = getGreeting();

  const mutation = useMutation({
    mutationFn: addMood,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["mood"] });
    },
    onError: () => toast.error("Something went wrong"),
  });

  const { data: moodData } = useQuery({
    queryKey: ["mood"],
    queryFn: getMood,
  });

  const handleAddMood = () => {
    mutation.mutate({ mood, sleep, stress });
  };

  useEffect(() => {
    if (!moodData?.data) return;
    setMood(moodData.data.mood);
    setSleep(moodData.data.sleep);
    setStress(moodData.data.stress);
  }, [moodData]);

  return (
    <SafeAreaView className="flex-1 bg-secondary px-5">
      <StatusBar barStyle="light-content" />

      <FlatList
        data={firstFive}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <HabitCard habit={item} />}
        contentContainerStyle={{ paddingBottom: 40, gap: 12 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="text-white text-center mt-6">
            No incomplete habits today 🎉
          </Text>
        }
        ListHeaderComponent={
          <>
            {/* HEADER */}
            <View className="flex-row items-center justify-between mt-2">
              <TouchableOpacity
                onPress={() => router.push("/profile")}
                className="bg-primary p-1 rounded-full"
              >
                <Image
                  source={session?.user.image || profile}
                  className="w-10 h-10 rounded-full"
                />
              </TouchableOpacity>

              <Image source={logo} className="w-10 h-10" />

              <TouchableOpacity>
                <Bell size={22} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* GREETING */}
            <View className="mt-8">
              <Text className="text-white text-3xl font-Poppins-ExtraBold">
                {greeting} 👋
              </Text>
              <Text className="text-white text-4xl font-Poppins-ExtraBold mt-1">
                {session?.user.name}
              </Text>
            </View>

            {/* MOOD / SLEEP / STRESS */}
            {[
              {
                title: "How are you feeling today?",
                icons: moodIcons,
                value: mood,
                set: setMood,
              },
              {
                title: "How was your sleep?",
                icons: sleepIcons,
                value: sleep,
                set: setSleep,
              },
              {
                title: "How stressed are you?",
                icons: stressIcons,
                value: stress,
                set: setStress,
              },
            ].map((item, idx) => (
              <View key={idx} className="bg-card rounded-2xl p-5 mt-5">
                <Text className="text-white text-lg font-Inter-Medium mb-3">
                  {item.title}
                </Text>
                <View className="flex-row justify-between">
                  {item.icons.map((icon, i) => (
                    <Card
                      key={i}
                      icon={icon}
                      active={item.value === i + 1}
                      onPress={() => item.set(i + 1)}
                    />
                  ))}
                </View>
              </View>
            ))}

            <TouchableOpacity
              onPress={handleAddMood}
              disabled={mutation.isPending}
              className="bg-primary rounded-full py-4 mt-6"
            >
              <Text className="text-white text-center font-Inter-Bold">
                Save Today’s Mood
              </Text>
            </TouchableOpacity>

            {/* AI CARD */}
            <View className="bg-card rounded-2xl p-5 mt-10 flex-row items-center">
              <View className="flex-1">
                <Text className="text-white text-2xl font-Poppins-ExtraBold">
                  MindMate AI
                </Text>
                <Text className="text-white mt-2">
                  A safe place to talk, reflect, and feel supported.
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/chatWithAi")}
                  className="bg-primary mt-4 py-3 rounded-full flex-row justify-center items-center gap-2"
                >
                  <Text className="text-white font-Inter-Bold">
                    Start a Chat
                  </Text>
                  <ArrowRight size={18} color="white" />
                </TouchableOpacity>
              </View>
              <Image source={ai} className="w-36 h-36" />
            </View>

            {/* HABITS HEADER */}
            <View className="mt-8">
              <View className="flex-row justify-between items-center">
                <Text className="text-white text-xl font-Inter-Bold">
                  Daily Habits
                </Text>
                <TouchableOpacity className="bg-primary px-4 py-2 rounded-full flex-row gap-2 items-center">
                  <Text className="text-white font-Inter-Bold text-sm">
                    Add Habit
                  </Text>
                  <Plus size={14} color="white" />
                </TouchableOpacity>
              </View>

              <Text className="text-white mt-2">
                Check off what you’ve completed today
              </Text>

              {isLoading && (
                <Text className="text-white text-center mt-4">Loading...</Text>
              )}
              {isError && (
                <Text className="text-red-500 text-center mt-4">
                  Failed to load habits
                </Text>
              )}
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default Index;
