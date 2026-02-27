import { profile } from "@/assets/icons";
import { authClient } from "@/lib/auth-client";
import { deleteAllChats } from "@/services/chat.services";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import {
  Bell,
  HeartPulse,
  LogOut,
  LucideIcon,
  Shield,
  Trash2,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
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

  return (
    <SafeAreaView className="flex-1 bg-secondary px-5">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ===== PROFILE CARD ===== */}
        <View className="bg-card rounded-3xl p-6 mt-4 items-center shadow-lg">
          <View className="bg-primary p-1 rounded-full mb-3">
            <Image
              source={session?.user.image || profile}
              className="w-24 h-24 rounded-full"
            />
          </View>

          <Text className="text-2xl font-Poppins-ExtraBold text-white">
            {session?.user.name}
          </Text>
          <Text className="text-gray-400 mt-1 font-Poppins-Medium">
            {session?.user.email}
          </Text>
        </View>

        {/* ===== SAFETY ===== */}
        <View className="bg-red-900/30 rounded-3xl p-5 mt-6 border border-red-500/40">
          <View className="flex-row items-center gap-2 mb-2">
            <HeartPulse size={20} color="#ef4444" />
            <Text className="text-red-400 font-bold">Safety & Support</Text>
          </View>

          <Text className="text-gray-200 text-sm leading-5">
            If you’re feeling overwhelmed or unsafe, please seek help
            immediately. You’re not alone.
          </Text>

          <TouchableOpacity className="bg-red-500 rounded-full p-3 mt-4">
            <Text className="text-white text-center font-bold">
              Get Helpline Support
            </Text>
          </TouchableOpacity>
        </View>

        {/* ===== SETTINGS ===== */}
        <View className="bg-card rounded-3xl p-5 mt-6 mb-10 shadow-lg">
          <Text className="text-lg font-bold text-white mb-3">Settings</Text>

          <SettingItem icon={Bell} label="Notifications" />
          <SettingItem icon={Shield} label="Privacy & Data" />

          {/* DELETE CHAT */}
          <SettingItem
            icon={Trash2}
            label="Delete Chat History"
            danger
            onPress={() => setShowDeleteModal(true)}
          />

          {/* LOGOUT */}
          <TouchableOpacity
            className="flex-row items-center gap-3 mt-6"
            onPress={() => setShowLogoutModal(true)}
          >
            <LogOut size={20} color="#ef4444" />
            <Text className="text-red-500 font-Inter-Bold text-lg">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ===== DELETE CHAT MODAL ===== */}
      <Modal transparent animationType="fade" visible={showDeleteModal}>
        <View className="flex-1 bg-black/60 items-center justify-center px-6">
          <View className="bg-card rounded-2xl p-6 w-full">
            <Text className="text-xl font-bold text-white mb-2">
              Delete Chat History?
            </Text>

            <Text className="text-gray-400 text-sm mb-6">
              This will permanently delete all your chats. This action cannot be
              undone.
            </Text>

            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 border border-white/20 rounded-xl p-3"
                onPress={() => setShowDeleteModal(false)}
              >
                <Text className="text-center text-white">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-red-500 rounded-xl p-3"
                onPress={() => deleteChatMutation.mutate()}
                disabled={deleteChatMutation.isPending}
              >
                <Text className="text-center text-white font-bold">
                  {deleteChatMutation.isPending ? "Deleting..." : "Yes, Delete"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ===== LOGOUT MODAL ===== */}
      <Modal transparent animationType="fade" visible={showLogoutModal}>
        <View className="flex-1 bg-black/60 items-center justify-center px-6">
          <View className="bg-card rounded-2xl p-6 w-full">
            <Text className="text-xl font-bold text-white mb-2">Logout?</Text>

            <Text className="text-gray-400 text-sm mb-6">
              Are you sure you want to logout from your account?
            </Text>

            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 border border-white/20 rounded-xl p-3"
                onPress={() => setShowLogoutModal(false)}
              >
                <Text className="text-center text-white">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-red-500 rounded-xl p-3"
                onPress={handleLogout}
              >
                <Text className="text-center text-white font-bold">
                  Yes, Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;
