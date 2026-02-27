import CustomHeader from "@/components/CustomHeader";
import HabitCard from "@/components/HabitCard";
import { addHabit, getHabits } from "@/services/habits.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

const Habits = () => {
  const queryClient = useQueryClient();
  const [habitName, setHabitName] = useState("");

  const { data, isLoading, isError, isFetching } = useQuery({
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
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => <HabitCard habit={item} />}
        ListHeaderComponent={
          <View>
            {/* ===== HEADER ===== */}
            <CustomHeader title="Daily Habits" />

            {/* ===== ADD HABIT ===== */}
            <View className="mt-8 bg-card rounded-2xl p-4 shadow">
              <Text className="text-white font-Poppins-Bold text-lg mb-3">
                Add a new habit
              </Text>

              <View className="flex-row items-center bg-white rounded-xl overflow-hidden">
                <TextInput
                  value={habitName}
                  onChangeText={setHabitName}
                  placeholder="What habit do you want to build?"
                  className="flex-1 px-4 py-3 text-base font-Inter-Medium"
                  placeholderTextColor="#9ca3af"
                  editable={!mutation.isPending}
                />

                <TouchableOpacity
                  disabled={mutation.isPending}
                  onPress={handleAddHabit}
                  className={`px-5 py-5 items-center justify-center ${
                    mutation.isPending ? "bg-card/60" : "bg-card"
                  }`}
                >
                  {mutation.isPending ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <PlusCircle size={20} color="#fff" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* ===== HELPER TEXT ===== */}
            {habits.length > 0 && (
              <Text className="text-sm text-gray-400 font-Inter-Medium mt-4 px-1">
                ✔️ Tap the checkbox to mark a habit as completed for today
              </Text>
            )}

            {/* ===== FETCHING INDICATOR ===== */}
            {isFetching && !isLoading && (
              <View className="mt-4 items-center">
                <ActivityIndicator size="small" color="#6b7280" />
              </View>
            )}

            {/* ===== STATES ===== */}
            <View className="mt-6">
              {isLoading && (
                <Text className="text-center text-gray-500 font-Inter-Medium">
                  Loading habits…
                </Text>
              )}

              {isError && (
                <Text className="text-center text-red-500 font-Inter-Medium">
                  Failed to load habits
                </Text>
              )}

              {!isLoading && habits.length === 0 && (
                <View className="mt-16 items-center px-6">
                  <Text className="text-xl font-Poppins-Bold text-white text-center">
                    No habits yet 🌱
                  </Text>
                  <Text className="mt-2 text-center text-gray-400 font-Inter-Medium">
                    Start with one small habit today. Consistency matters more
                    than perfection.
                  </Text>
                </View>
              )}
            </View>

            {/* ===== LIST HEADER SPACING ===== */}
            {habits.length > 0 && (
              <Text className="mt-6 mb-3 text-white font-Poppins-Bold text-lg">
                Your Habits
              </Text>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Habits;
