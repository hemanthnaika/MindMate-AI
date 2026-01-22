import { Pressable, View } from "react-native";
import { Check } from "lucide-react-native";
import cn from "clsx";

type CheckboxProps = {
  checked: boolean;
  onToggle: (value: boolean) => void;
  checkStyle?: string;
};

const Checkbox = ({ checked, onToggle, checkStyle }: CheckboxProps) => {
  return (
    <Pressable onPress={() => onToggle(!checked)}>
      <View
        className={cn(
          "border-2 border-primary rounded-xl items-center justify-center",
          checked ? "bg-primary" : "bg-transparent",
          checkStyle
        )}
      >
        {checked && <Check size={18} color="#fff" />}
      </View>
    </Pressable>
  );
};

export default Checkbox;
