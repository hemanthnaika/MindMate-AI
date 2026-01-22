import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { LucideIcon } from "lucide-react-native";
import cn from "clsx";

type Props = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  icon: LucideIcon;
  error: boolean;
  editable: boolean;
};

const CustomInput = ({
  placeholder = "Enter Text",
  value,
  onChangeText,
  label,
  secureTextEntry = false,
  keyboardType = "default",
  icon: Icon,
  error = false,
  editable = true,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className="w-full gap-4">
      <Text className="font-Poppins-ExtraBold text-lg">{label}</Text>
      <View
        className={cn(
          "flex-row items-center border rounded-xl bg-[#ffffff]/90 ",
          error
            ? "border-red-500 border-2"
            : isFocused
              ? "border-primary"
              : "border-gray-400"
        )}
      >
        {Icon && (
          <View className="pl-4">
            <Icon size={20} color="#000" />
          </View>
        )}

        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`px-3 py-2 w-full  font-Poppins-Medium ${
            !editable && "opacity-50"
          }`}
          editable={editable}
        />
      </View>
    </View>
  );
};

export default CustomInput;
