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

  // 🔹 UPDATE mutation (UNCHANGED LOGIC)
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

  // 🔹 DELETE mutation (UNCHANGED LOGIC)
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
      {/* ================= HABIT CARD ================= */}
      <View className="bg-neutral/60 rounded-2xl p-5 border border-white/10 shadow mb-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-4 flex-1">
            <View className="flex-1">
              <Text
                className={`font-Plus-Bold text-lg ${
                  habit.completed ? "text-gray-400 line-through" : "text-white"
                }`}
              >
                {habit?.name}
              </Text>

              <Text className="text-md text-gray-400 mt-1 font-Plus-Regular ">
                {habit.completed ? "Completed today 🎉" : "Keep going 💪"}
              </Text>
            </View>
            <Checkbox
              checked={habit.completed}
              onToggle={handleToggle}
              checkStyle="w-10 h-10"
            />
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row justify-between mt-4">
          <Text className="text-sm text-gray-400 font-Plus-Medium">
            🔥 Streak:{" "}
            <Text className="text-white font-Plus-Medium">
              {habit?.streak} days
            </Text>
          </Text>
        </View>

        {/* Progress bar */}
        <View className="h-2 bg-white/10 rounded-full mt-3 overflow-hidden">
          <View
            className="h-full bg-primary rounded-full"
            style={{ width: `${habit?.consistency}%` }}
          />
        </View>

        <View className="flex-row items-center gap-7 mt-5">
          <Pressable
            onPress={() => setEditOpen(true)}
            className="bg-primary p-2 rounded-full"
          >
            <Pencil size={18} color="#1A1C1E" />
          </Pressable>

          <Pressable
            onPress={() => setDeleteOpen(true)}
            className="bg-red-500 p-2 rounded-full"
          >
            <Trash2 size={18} color="#1A1C1E" />
          </Pressable>
        </View>
      </View>

      {/* ================= UPDATE MODAL ================= */}
      <Modal transparent visible={editOpen} animationType="slide">
        <Pressable
          className="flex-1 bg-black/60 justify-end"
          onPress={() => setEditOpen(false)}
        >
          <Pressable
            className="bg-neutral p-6 rounded-t-3xl"
            onPress={(e) => e.stopPropagation()}
          >
            <Text className="text-white text-xl mb-4 font-Plus-Bold">
              Rename Habit
            </Text>

            <TextInput
              value={newName}
              onChangeText={setNewName}
              className="bg-white/10 text-white p-4 rounded-xl mb-4 font-Plus-Bold"
              placeholder="Habit name"
              placeholderTextColor="#9ca3af"
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
              <Text className="text-white text-center font-Plus-Bold">
                {updateMutation.isPending ? "Updating..." : "Save Changes"}
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ================= DELETE MODAL ================= */}
      <Modal transparent visible={deleteOpen} animationType="fade">
        <Pressable
          className="flex-1 bg-black/60 justify-center px-6"
          onPress={() => setDeleteOpen(false)}
        >
          <Pressable
            className="bg-neutral p-6 rounded-2xl"
            onPress={(e) => e.stopPropagation()}
          >
            <Text className="text-white text-lg mb-3 font-Plus-Bold">
              Delete Habit?
            </Text>

            <Text className="text-gray-400 mb-6 font-Plus-Medium">
              This habit and its progress will be permanently removed.
            </Text>

            <View className="flex-row gap-4">
              <Pressable
                className="flex-1 bg-white/10 p-3 rounded-xl"
                onPress={() => setDeleteOpen(false)}
              >
                <Text className="text-white text-center font-Plus-Bold">
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                disabled={deleteMutation.isPending}
                className={`flex-1 p-3 rounded-xl ${
                  deleteMutation.isPending ? "bg-red-600/50" : "bg-red-600"
                }`}
                onPress={() => deleteMutation.mutate({ habitName: habit.name })}
              >
                <Text className="text-white text-center font-Plus-Bold">
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
