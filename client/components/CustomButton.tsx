import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LucideIcon } from "lucide-react-native";
import cn from "clsx";

type Props = {
  title?: string;
  icon?: LucideIcon;
  onPress?: () => void;
  style?: string;
  isLoading?: boolean;
};

const CustomButton = ({
  title = "Click",
  icon: Icon,
  onPress,
  style,
  isLoading = false,
}: Props) => {
  return (
    <TouchableOpacity
      className={cn(
        "bg-primary px-10 py-5 rounded-full flex-row items-center gap-3 text-center justify-center",
        style
      )}
      onPress={onPress}
    >
      {isLoading ? (
        <ActivityIndicator size={"small"} color={"white"} />
      ) : (
        <>
          <Text className="text-white font-Poppins-Bold text-xl">{title}</Text>
          {Icon && (
            <Icon
              size={20}
              color="white"
              className="font-Poppins-Bold text-2xl"
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
