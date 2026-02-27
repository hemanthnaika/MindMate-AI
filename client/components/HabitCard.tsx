import {
  deleteHabit,
  markHabit,
  updateHabit,
} from "@/services/habits.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react-native";
import React, { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { toast } from "sonner-native";
import Checkbox from "./ui/Checkbox";

const HabitCard = ({ habit }: { habit: any }) => {
  const queryClient = useQueryClient();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [newName, setNewName] = useState(habit.name);

  // 🔹 EXISTING mutation (UNCHANGED)
  const mutation = useMutation({
    mutationFn: markHabit,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      toast.success("Habit updated");
    },
    onError(error: any) {
      toast.error(error?.message || "Something went wrong");
    },
  });

  // 🔹 UPDATE: added loading + error handling (NO logic changed)
  const updateMutation = useMutation({
    mutationFn: updateHabit,
    onSuccess() {
      toast.success("Habit renamed successfully");
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      setEditOpen(false);
    },
    onError(error: any) {
      toast.error(error?.message || "Failed to update habit");
    },
  });

  // 🔹 DELETE: added error handling only
  const deleteMutation = useMutation({
    mutationFn: deleteHabit,
    onSuccess() {
      toast.success("Habit deleted");
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      setDeleteOpen(false);
    },
    onError(error: any) {
      toast.error(error?.message || "Failed to delete habit");
    },
  });

  const handleToggle = (checked: boolean) => {
    mutation.mutate({ habitName: habit?.name, completed: checked });
  };

  return (
    <>
      {/* ================= EXISTING UI ================= */}
      <View className="bg-primary/10 p-4 rounded-2xl mb-4 border border-white/10">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-4 flex-1">
            <Checkbox
              checked={habit.completed}
              onToggle={handleToggle}
              checkStyle="w-9 h-9"
            />

            <Text className="font-Inter-SemiBold text-xl text-white">
              {habit?.name}
            </Text>
          </View>

          <View className="flex-row items-center gap-4">
            <Pressable onPress={() => setEditOpen(true)}>
              <Pencil size={20} color="#fff" />
            </Pressable>

            <Pressable onPress={() => setDeleteOpen(true)}>
              <Trash2 size={20} color="#ff4d4f" />
            </Pressable>
          </View>
        </View>

        <View className="flex-row justify-between mt-4">
          <Text className="text-sm text-gray-300">
            Streak:{" "}
            <Text className="text-white font-Inter-Medium">
              {habit?.streak} days
            </Text>
          </Text>

          <Text className="text-sm text-gray-300">
            Consistency:{" "}
            <Text className="text-white font-Inter-Medium">
              {habit?.consistency}%
            </Text>
          </Text>
        </View>

        <View className="h-2 bg-white/20 rounded-full mt-3 overflow-hidden">
          <View
            className="h-full bg-primary rounded-full"
            style={{ width: `${habit?.consistency}%` }}
          />
        </View>
      </View>

      {/* ================= UPDATE MODAL ================= */}
      <Modal transparent visible={editOpen} animationType="slide">
        <Pressable
          className="flex-1 bg-black/50 justify-end"
          onPress={() => setEditOpen(false)}
        >
          <Pressable
            className="bg-[#121212] p-6 rounded-t-3xl"
            onPress={(e) => e.stopPropagation()}
          >
            <Text className="text-white text-xl mb-4 font-Inter-SemiBold">
              Update Habit
            </Text>

            <TextInput
              value={newName}
              onChangeText={setNewName}
              className="bg-white/10 text-white p-4 rounded-xl mb-4"
              placeholder="Habit name"
              placeholderTextColor="#888"
            />

            <Pressable
              disabled={updateMutation.isPending}
              className={`p-4 rounded-xl ${
                updateMutation.isPending ? "bg-primary/50" : "bg-primary"
              }`}
              onPress={() =>
                updateMutation.mutate({
                  oldHabitName: habit.name,
                  newHabitName: newName,
                })
              }
            >
              <Text className="text-white text-center font-Inter-SemiBold">
                {updateMutation.isPending ? "Updating..." : "Update"}
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ================= DELETE MODAL ================= */}
      <Modal transparent visible={deleteOpen} animationType="fade">
        <Pressable
          className="flex-1 bg-black/50 justify-center px-6"
          onPress={() => setDeleteOpen(false)}
        >
          <Pressable
            className="bg-[#121212] p-6 rounded-2xl"
            onPress={(e) => e.stopPropagation()}
          >
            <Text className="text-white text-lg mb-3 font-Inter-SemiBold">
              Delete Habit?
            </Text>

            <Text className="text-gray-300 mb-6">
              Are you sure you want to delete this habit?
            </Text>

            <View className="flex-row gap-4">
              <Pressable
                className="flex-1 bg-white/10 p-3 rounded-xl"
                onPress={() => setDeleteOpen(false)}
              >
                <Text className="text-white text-center">Cancel</Text>
              </Pressable>

              <Pressable
                disabled={deleteMutation.isPending}
                className={`flex-1 p-3 rounded-xl ${
                  deleteMutation.isPending ? "bg-red-600/50" : "bg-red-600"
                }`}
                onPress={() => deleteMutation.mutate({ habitName: habit.name })}
              >
                <Text className="text-white text-center font-Inter-SemiBold">
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

export default HabitCard;
