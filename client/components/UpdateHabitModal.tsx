import React, { useState } from "react";
import { Pressable, Text, TextInput } from "react-native";
import BottomModal from "./ui/BottomModal";

const UpdateHabitModal = ({
  visible,
  onClose,
  habitName,
  onUpdate,
}: {
  visible: boolean;
  onClose: () => void;
  habitName: string;
  onUpdate: (newName: string) => void;
}) => {
  const [name, setName] = useState(habitName);

  return (
    <BottomModal visible={visible} onClose={onClose}>
      <Text className="text-white text-xl font-Inter-SemiBold mb-4">
        Update Habit
      </Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Habit name"
        placeholderTextColor="#888"
        className="bg-white/10 text-white p-4 rounded-xl mb-4"
      />

      <Pressable
        className="bg-primary p-4 rounded-xl"
        onPress={() => onUpdate(name)}
      >
        <Text className="text-center text-white font-Inter-SemiBold">
          Update
        </Text>
      </Pressable>
    </BottomModal>
  );
};

export default UpdateHabitModal;
