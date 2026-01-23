import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addHabit, getHabits } from "@/services/habits.services";
import CustomHeader from "@/components/CustomHeader";
import { PlusCircle } from "lucide-react-native";
import HabitCard from "@/components/HabitCard";
import { toast } from "sonner-native";

const Habits = () => {
  const queryClient = useQueryClient();
  const [habitName, setHabitName] = useState("");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["habits"],
    queryFn: getHabits,
  });
  const habits = data?.habits ?? [];

  const mutation = useMutation({
    mutationFn: addHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      toast.success("Habit added successfully");
      setHabitName("");
    },
    onError: (error: any) => {
      const message =
        error?.message || error?.error?.message || "Something went wrong";

      toast.error(message);
    },
  });

  const handleAddHabit = () => {
    if (!habitName.trim()) {
      toast.error("Please enter habit name");
      return;
    }

    mutation.mutate({ habitName });
  };

  return (
    <SafeAreaView className="bg-secondary flex-1 px-5">
      <FlatList
        data={habits}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => <HabitCard habit={item} />}
        ListHeaderComponent={
          <View className="flex-1">
            <CustomHeader title="Daily Habits" />

            {/* Add habit input */}
            <View className="mt-10 flex-row items-center bg-white rounded-xl overflow-hidden">
              <TextInput
                value={habitName}
                onChangeText={setHabitName}
                placeholder="What habit do you want to build?"
                className="flex-1 px-4 py-3 text-base font-Inter-Medium"
                placeholderTextColor="#9ca3af"
              />
              <TouchableOpacity
                className="bg-card px-5 py-5 items-center justify-center"
                onPress={handleAddHabit}
              >
                <PlusCircle size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            {habits?.length > 0 && (
              <View className="mt-3 px-1">
                <Text className="text-lg text-gray-500 font-Inter-Medium mt-5">
                  ✔️ Tap the checkbox to mark a habit as completed for today
                </Text>
              </View>
            )}
            {/* Content */}
            <View className="mt-8 flex-1">
              {isLoading && (
                <Text className="text-center text-gray-500">
                  Loading habits…
                </Text>
              )}

              {isError && (
                <Text className="text-center text-red-500">
                  Failed to load habits
                </Text>
              )}

              {!isLoading && data?.length === 0 && (
                <View className="flex-1 items-center justify-center px-6">
                  <Text className="text-lg font-Inter-SemiBold text-center">
                    No habits yet 🌱
                  </Text>
                  <Text className="mt-2 text-center text-gray-500">
                    Start with one small habit today. Consistency matters more
                    than perfection.
                  </Text>
                </View>
              )}
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Habits;
