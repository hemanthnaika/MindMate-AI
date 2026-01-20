import { Pressable, View, Text } from "react-native";
import { Check } from "lucide-react-native";
import React, { useState } from "react";
import cn from "clsx";

const Checkbox = ({
  title,
  style,
  checkStyle,
}: {
  title?: string;
  style?: string;
  checkStyle?: string;
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <Pressable
      onPress={() => setChecked(!checked)}
      className={cn("flex-row items-center gap-3", style)}
    >
      <View
        className={`w-5 h-5 rounded border-2 items-center justify-center ${
          checked ? "bg-primary border-primary" : "border-gray-400"
        } ${checkStyle}`}
      >
        {checked && <Check size={14} color="white" />}
      </View>

      {title && <Text className="font-Poppins-Medium">{title}</Text>}
    </Pressable>
  );
};

export default Checkbox;
