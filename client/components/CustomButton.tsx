import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { LucideIcon } from "lucide-react-native";

type Props = {
  title?: string;
  icon?: LucideIcon;
  onPress?: () => void;
};

const CustomButton = ({ title = "Click", icon: Icon, onPress }: Props) => {
  return (
    <TouchableOpacity
      className="bg-primary px-10 py-5 rounded-full flex-row items-center gap-3"
      onPress={onPress}
    >
      <Text className="text-white font-Poppins-Bold text-xl">{title}</Text>
      {Icon && (
        <Icon size={20} color="white" className="font-Poppins-Bold text-2xl" />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
