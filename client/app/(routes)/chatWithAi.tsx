import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/CustomHeader";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

const ChatWithAi = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]} className="bg-secondary">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="px-5">
          <CustomHeader title="MindMate AI" onPress={() => router.back()} />
        </View>

        <FlatList
          data={[
            { id: "1", text: "Hi Alex, how are you feeling today?", ai: true },
            { id: "2", text: "I feel a bit stressed.", ai: false },
          ]}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 12,
          }}
          renderItem={({ item }) => (
            <View
              className={`mb-3 max-w-[80%] px-4 py-3 rounded-2xl ${
                item.ai ? "bg-[#F3F1FF] self-start" : "bg-primary self-end"
              }`}
            >
              <Text
                className={`text-base ${
                  item.ai ? "text-gray-800" : "text-white"
                }`}
              >
                {item.text}
              </Text>
            </View>
          )}
        />

        {/* Input Bar */}
        <View
          style={{
            padding: 12,
            borderTopWidth: 1,
            borderColor: "#e5e7eb",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingBottom: 10,
          }}
        >
          <TextInput
                placeholder="Type how you’re feeling…"
            style={{
              flex: 1,
              backgroundColor: "#f1f5f9",
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 999,
            }}
          />

          <TouchableOpacity
            style={{
              backgroundColor: "#4f46e5",
              padding: 12,
              borderRadius: 999,
            }}
          >
            <Feather name="send" color={"#ffffff"} size={20} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatWithAi;
