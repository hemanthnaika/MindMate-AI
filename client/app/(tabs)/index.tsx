import {  logo, profile, quote } from "@/assets/icons";
import cn from "clsx";
import {
 
  List,
  MessageSquare,

  Settings,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,

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
import { BlurView } from "expo-blur";

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
      "w-14 h-14 rounded-md items-center justify-center ",
      active ? "bg-primary" : "bg-neutral",
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
    <View className="flex-1 bg-secondary">
      <SafeAreaView className="flex-row items-center justify-between bg-neutral px-7 pb-5">
        <TouchableOpacity
          onPress={() => router.push("/profile")}
          className="bg-primary p-1 rounded-full"
        >
          <Image
            source={session?.user.image || profile}
            className="w-10 h-10 rounded-full"
          />
        </TouchableOpacity>
        <View className="flex-row items-center gap-1">
          <Image source={logo} className="w-10 h-10" resizeMode="contain" />
          <Text className="text-primary font-Plus-Bold text-lg">
            MindMate-AI
          </Text>
        </View>
        <TouchableOpacity>
          <Settings size={22} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView edges={["bottom"]} className="px-7 flex-1">
        <FlatList
          data={firstFive}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <HabitCard habit={item} />}
          ListEmptyComponent={
            <Text className="text-white text-center my-5 font-Plus-Bold text-lg">
              No incomplete habits today 🎉
            </Text>
          }
          ListHeaderComponent={
            <>
              <Text className="text-white font-Plus-Bold  mt-6 text-4xl">
                {greeting},{session?.user.name}{" "}
              </Text>
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
                <View key={idx} className="mt-5">
                  <Text className="text-white text-lg font-Plus-Medium mb-3">
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
                <Text className=" text-center font-Plus-Bold">
                  Save Today’s Mood
                </Text>
              </TouchableOpacity>

              <View className="mt-10 flex-row justify-between gap-5 items-center">
                <TouchableOpacity
                  className="bg-neutral flex-1  p-5 rounded-md items-center"
                  onPress={() => router.push("/(tabs)/habits")}
                >
                  <List color="#fff" />
                  <Text className="text-white font-Plus-Medium mt-2">
                    Add Habit
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-neutral flex-1  p-5 rounded-md items-center"
                  onPress={() => router.push("/chatWithAi")}
                >
                  <MessageSquare color="#fff" />
                  <Text className="text-white font-Plus-Medium mt-2">
                    Start Chat
                  </Text>
                </TouchableOpacity>
              </View>

              <ImageBackground
                source={quote}
                className="w-full h-96 mt-10 justify-center items-center rounded-xl overflow-hidden relative"
              >
                <BlurView
                  intensity={99}
                  tint="dark"
                  className="absolute inset-0"
                />
                {/* Text */}
                <Text className="text-white text-center font-Plus-Bold text-2xl px-4 ">
                  &quot;I am capable of navigating whatever this day brings with
                  grace and inner peace.&quot;
                </Text>
              </ImageBackground>
              <View className="flex-row items-center justify-between">
                <Text className="text-white font-Plus-Bold my-7 text-xl">
                  Today&apos;s Habits
                </Text>
                <TouchableOpacity onPress={() => router.push("/(tabs)/habits")}>
                  <Text className="text-primary font-Plus-Medium">
                    View all
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          }
        />
      </SafeAreaView>
    </View>
  );
};

export default Index;
