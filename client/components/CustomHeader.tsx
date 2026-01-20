import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";

const CustomHeader = ({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between"
      onPress={onPress}
    >
      <Feather name="arrow-left-circle" color={"#ffffff"} size={30} />
      <Text className="text-white font-Poppins-ExtraBold text-2xl">
        {title}
      </Text>
      <View />
    </TouchableOpacity>
  );
};

export default CustomHeader;
