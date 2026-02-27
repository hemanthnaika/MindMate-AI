import CustomHeader from "@/components/CustomHeader";
import { getChatHistory, sendMessage } from "@/services/chat.services";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Markdown from "react-native-markdown-display";
import { SafeAreaView } from "react-native-safe-area-context";

const markdownStyles = StyleSheet.create({
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Inter-Medium",
  },
  strong: {
    fontWeight: "700",
  },
  bullet_list: {
    marginVertical: 6,
  },
  list_item: {
    marginVertical: 4,
  },
  paragraph: {
    marginBottom: 8,
  },
});

const ChatWithAi = () => {
  const [messages, setMessages] = useState<
    { id: string; text: string; ai: boolean }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const flatListRef = useRef<FlatList>(null);

  // Load previous chat history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getChatHistory();

        // Convert history to UI format
        const formatted = history.map((msg: any, index: number) => ({
          id: index.toString(),
          text: msg.content,
          ai: msg.role === "assistant",
        }));

        setMessages(formatted);
      } catch (err) {
        console.log(err);
      }
    };

    fetchHistory();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      ai: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const aiReply = await sendMessage(input);

      const aiMessage = {
        id: Date.now().toString() + "-ai",
        text: aiReply,
        ai: true,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  };

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
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <View className="mt-24 items-center px-6">
              <Text className="text-xl font-Poppins-Bold text-white">
                Talk to MindMate 💙
              </Text>
              <Text className="text-gray-400 mt-2 text-center font-Inter-Medium">
                A safe place to share your thoughts.
              </Text>
            </View>
          }
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 12,
          }}
          renderItem={({ item }) => (
            <View
              className={`mb-3 max-w-[80%] px-4 py-3 rounded-2xl ${
                item.ai ? "bg-white self-start" : "bg-primary self-end"
              }`}
            >
              {item.ai ? (
                <Markdown style={markdownStyles}>{item.text}</Markdown>
              ) : (
                <Text className="font-Poppins-Medium text-white">
                  {item.text}
                </Text>
              )}
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
            value={input}
            onChangeText={setInput}
            placeholder="Type how you’re feeling…"
            style={{
              flex: 1,
              backgroundColor: "#f1f5f9",
              paddingHorizontal: 16,
              paddingVertical: 20,
              borderRadius: 12,
            }}
            multiline
          />

          <TouchableOpacity
            disabled={loading}
            onPress={handleSend}
            style={{
              backgroundColor: "#4f46e5",
              padding: 12,
              borderRadius: 999,
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Feather name="send" color={"#ffffff"} size={20} />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatWithAi;
