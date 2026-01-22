import { View, Text } from "react-native";
import React from "react";
import Checkbox from "./ui/Checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markHabit } from "@/services/habits.services";
import { toast } from "sonner-native";

const HabitCard = ({ habit }: { habit: any }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: markHabit,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      toast.success("Habit marked successfully");
    },
    onError(error: any) {
      const message =
        error?.message || error?.error?.message || "Something went wrong";
      toast.error(message);
    },
  });

  const handleToggle = (checked: boolean) => {
    mutation.mutate({ habitName: habit?.name, completed: checked });
  };

  return (
    <View className="bg-primary/10 p-4 rounded-2xl">
      <View className="flex-row items-center gap-4">
        <Checkbox
          checked={habit.completed}
          onToggle={handleToggle}
          checkStyle="w-10 h-10"
        />

        <View className="flex-1">
          <Text className="font-Inter-Medium text-xl text-white">
            {habit?.name}
          </Text>

          <View className="flex-row items-center justify-between mt-2">
            <Text className="text-sm text-gray-200">
              Streak: <Text className="text-white">{habit?.streak} days</Text>
            </Text>

            <Text className="text-sm text-gray-200">
              Consistency:{" "}
              <Text className="text-white">{habit?.consistency}%</Text>
            </Text>
          </View>

          {/* Progress Bar */}
          <View className="h-2 bg-white/20 rounded-full mt-3 overflow-hidden">
            <View
              className="h-full bg-primary rounded-full"
              style={{ width: `${habit?.consistency}%` }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HabitCard;
