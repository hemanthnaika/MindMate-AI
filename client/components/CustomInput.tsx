import { View, Text, TextInput } from "react-native";
import React from "react";
import { LucideIcon } from "lucide-react-native";

type Props = {
  label?: string;
  icon?: LucideIcon;
  placeholder?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
};

const CustomInput = ({
  label = "Label",
  icon: Icon,
  placeholder = "Type here",
  keyboardType = "default",
}: Props) => {
  return (
    <View className="w-full gap-4">
      <Text className="font-Poppins-ExtraBold text-lg">{label}</Text>
      <View className="flex-row items-center border rounded-xl bg-[#ffffff]/90 border-lightGrey">
        {Icon && (
          <View className="pl-4">
            <Icon size={20} color="#000" />
          </View>
        )}

        <TextInput
          placeholder={placeholder}
          keyboardType={keyboardType}
          className="flex-1 font-Poppins-Medium px-4 py-3"
        />
      </View>
    </View>
  );
};

export default CustomInput;
