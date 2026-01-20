import { View, Text, FlatList } from "react-native";
import React from "react";
import Checkbox from "./ui/Checkbox";

const HabitCard = () => {
  return (
    <View className="bg-primary/10 p-5">
      <View className="flex-row items-center gap-5">
        <Checkbox checkStyle="w-10 h-10" />
        <Text className="font-Inter-Medium text-xl text-white">
          Morning Walk
        </Text>
      </View>
    </View>
  );
};

export default HabitCard;
