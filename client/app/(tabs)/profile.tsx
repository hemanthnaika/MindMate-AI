import { profile } from "@/assets/icons";
import CustomHeader from "@/components/CustomHeader";
import { authClient } from "@/lib/auth-client";
import { deleteAllChats } from "@/services/chat.services";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import {
  Bell,
  ChevronRight,
  HeartPulse,
  LogOut,
  LucideIcon,
  Settings,
  Shield,
  ShieldCheck,
  Trash,
  Trash2,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingItem = ({
  icon: Icon,
  label,
  onPress,
  danger,
}: {
  icon: LucideIcon;
  label: string;
  onPress?: () => void;
  danger?: boolean;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center gap-3 py-4 border-b border-white/10"
  >
    <Icon size={20} color={danger ? "#ef4444" : "#a78bfa"} />
    <Text
      className={`text-lg font-Poppins-Bold ${
        danger ? "text-red-400" : "text-white"
      }`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const Profile = () => {
  const { data: session } = authClient.useSession();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // 🔥 Delete chat mutation
  const deleteChatMutation = useMutation({
    mutationFn: deleteAllChats,
    onSuccess: () => {
      setShowDeleteModal(false);
    },
  });

  // 🔐 Logout handler (LOGIC UNCHANGED)
  const handleLogout = async () => {
    await authClient.signOut();
    router.replace("/(auth)");
  };
  const [encryption, setEncryption] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  return (
    <View className="flex-1 bg-secondary">
      <SafeAreaView className="px-7 bg-neutral pb-5">
        <CustomHeader title="Profile" onPress={() => router.back()} />
      </SafeAreaView>
      <SafeAreaView className="flex-1 bg-secondary px-7" edges={["bottom"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        >
          {/* ===== PROFILE CARD ===== */}
          <View className="bg-card rounded-3xl p-6 mt-4 items-center shadow-lg">
            <View className="bg-primary p-1 rounded-full mb-3">
              <Image
                source={session?.user.image || profile}
                className="w-24 h-24 rounded-full"
              />
            </View>

            <Text className="text-2xl font-Plus-Bold text-white">
              {session?.user.name}
            </Text>
            <Text className="text-gray-400 mt-1 font-Plus-Medium">
              {session?.user.email}
            </Text>
          </View>
          <View className="flex-row gap-5 items-center ">
            <ShieldCheck color={"#76A1B5"} size={25} />
            <Text className="text-white font-Plus-Bold text-xl font-bold">
              Privacy & Security
            </Text>
          </View>

          <View className="flex-row items-center justify-between bg-neutral p-5 mt-5 rounded-2xl">
            <View className="flex-1 pr-4">
              <Text className="text-white font-Plus-Bold text-lg mb-1">
                End-to-End Encryption
              </Text>

              <Text className="text-white/70 font-Plus-Medium text-sm leading-5">
                All your chats and mood data are encrypted before leaving your
                device.
              </Text>
            </View>
            <Switch
              value={encryption}
              onValueChange={setEncryption}
              trackColor={{ false: "#3A3A3A", true: "#76A1B5" }}
              thumbColor={encryption ? "#fff" : "#f4f4f4"}
            />
          </View>

          <View className="flex-row items-center justify-between bg-neutral p-5 mt-5 rounded-2xl">
            <View className="flex-1 pr-4">
              <Text className="text-white font-Plus-Bold text-lg mb-1">
                AI Privacy Shield
              </Text>
              <Text className="text-white/70 font-Plus-Medium text-sm leading-5">
                Prevent AI from using your data for general model training.
              </Text>
            </View>
            <Switch
              value={privacy}
              onValueChange={setPrivacy}
              trackColor={{ false: "#3A3A3A", true: "#76A1B5" }}
              thumbColor={privacy ? "#fff" : "#f4f4f4"}
            />
          </View>

          <View className="flex-row gap-3 items-center mt-5">
            <Settings color={"#76A1B5"} size={25} />
            <Text className="text-white font-Plus-Bold text-xl font-bold">
              General Settings
            </Text>
          </View>

          <View className="mt-5 flex-row items-center justify-between gap-3 bg-neutral p-5 rounded-2xl">
            <View className="flex-row items-center gap-5">
              <View className="bg-primary/20 p-3 rounded-xl">
                <Bell color={"#76A1B5"} size={25} />
              </View>
              <Text className="text-white font-Plus-Medium">Notifications</Text>
            </View>

            <ChevronRight color={"#76A1B5"} size={25} />
          </View>

          <TouchableOpacity
            onPress={() => setShowDeleteModal(true)}
            className="mt-5 flex-row items-center justify-between gap-3 bg-neutral p-5 rounded-2xl"
          >
            <View className="flex-row items-center gap-5">
              <View className="bg-red-500 p-3 rounded-xl">
                <Trash color={"#fff"} size={25} />
              </View>
              <Text className="text-white font-Plus-Medium">
                Delete Chat History
              </Text>
            </View>
            <ChevronRight color={"#76A1B5"} size={25} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowLogoutModal(true)}
            className="mt-5 flex-row items-center justify-between gap-3 bg-neutral p-5 rounded-2xl"
          >
            <View className="flex-row items-center gap-5">
              <View className="bg-red-500/90 p-3 rounded-xl">
                <LogOut size={20} color="#fff" />
              </View>
              <Text className="text-white font-Plus-Medium">Logout</Text>
            </View>
            <ChevronRight color={"#76A1B5"} size={25} />
          </TouchableOpacity>
        </ScrollView>

        {/* ===== DELETE CHAT MODAL ===== */}
        <Modal transparent animationType="fade" visible={showDeleteModal}>
          <View className="flex-1 bg-black/90 items-center justify-center px-6">
            <View className="bg-neutral rounded-xl p-6 w-full">
              <Text className="text-xl font-Plus-Bold text-white mb-2">
                Delete Chat History?
              </Text>

              <Text className="text-gray-400 text-md mb-6 font-Plus-Medium">
                This will permanently delete all your chats. This action cannot
                be undone.
              </Text>

              <View className="flex-row gap-3">
                <TouchableOpacity
                  className="flex-1 border border-white/20 rounded-xl p-3"
                  onPress={() => setShowDeleteModal(false)}
                >
                  <Text className="text-center text-white font-Plus-Bold">
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 bg-red-500 rounded-xl p-3"
                  onPress={() => deleteChatMutation.mutate()}
                  disabled={deleteChatMutation.isPending}
                >
                  <Text className="text-center text-white font-Plus-Bold">
                    {deleteChatMutation.isPending
                      ? "Deleting..."
                      : "Yes, Delete"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* ===== LOGOUT MODAL ===== */}
        <Modal transparent animationType="fade" visible={showLogoutModal}>
          <View className="flex-1 bg-black/90 items-center justify-center px-6">
            <View className="bg-neutral rounded-xl p-6 w-full">
              <Text className="text-xl font-Plus-Bold text-white mb-2">
                Logout?
              </Text>

              <Text className="text-gray-400 text-md mb-6 font-Plus-Medium">
                Are you sure you want to logout from your account?
              </Text>

              <View className="flex-row gap-3">
                <TouchableOpacity
                  className="flex-1 border border-white/20 rounded-xl p-3"
                  onPress={() => setShowLogoutModal(false)}
                >
                  <Text className="text-center text-white font-Plus-Bold">
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 bg-red-500 rounded-xl p-3"
                  onPress={handleLogout}
                >
                  <Text className="text-center text-white font-Plus-Bold">
                    Yes, Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
