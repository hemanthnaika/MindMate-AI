import React from "react";
import { Modal, Pressable } from "react-native";

const BottomModal = ({
  visible,
  onClose,
  children,
}: {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable className="flex-1 bg-black/50 justify-end" onPress={onClose}>
        <Pressable
          className="bg-[#121212] p-6 rounded-t-3xl"
          onPress={(e) => e.stopPropagation()}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default BottomModal;
