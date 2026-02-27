import React from "react";
import { Pressable, Text, View } from "react-native";
import BottomModal from "./ui/BottomModal";

const DeleteHabitModal = ({
  visible,
  onClose,
  onDelete,
}: {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
}) => {
  return (
    <BottomModal visible={visible} onClose={onClose}>
      <Text className="text-white text-xl font-Inter-SemiBold mb-3">
        Delete Habit?
      </Text>

      <Text className="text-gray-300 mb-6">
        Are you sure you want to delete this habit? This action cannot be
        undone.
      </Text>

      <View className="flex-row gap-4">
        <Pressable
          className="flex-1 bg-white/10 p-4 rounded-xl"
          onPress={onClose}
        >
          <Text className="text-center text-white">Cancel</Text>
        </Pressable>

        <Pressable
          className="flex-1 bg-red-600 p-4 rounded-xl"
          onPress={onDelete}
        >
          <Text className="text-center text-white font-Inter-SemiBold">
            Delete
          </Text>
        </Pressable>
      </View>
    </BottomModal>
  );
};

export default DeleteHabitModal;
