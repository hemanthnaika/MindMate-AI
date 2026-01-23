import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  LogOut,
  Bell,
  Shield,
  HeartPulse,
  LucideIcon,
} from "lucide-react-native";
import { authClient } from "@/lib/auth-client";
import { profile } from "@/assets/icons";
import { router } from "expo-router";

const SettingItem = ({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) => (
  <TouchableOpacity className="flex-row items-center gap-3 py-3">
    <Icon size={20} color="#a78bfa" />
    <Text className="text-white font-Poppins-Bold text-lg">{label}</Text>
  </TouchableOpacity>
);

const Profile = () => {
  const { data: session } = authClient.useSession();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Logout",
          style: "destructive",
          onPress: async () => {
            await authClient.signOut();
            router.replace("/(auth)");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary px-5">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-card rounded-2xl p-5 mt-4 items-center shadow">
          <View className="bg-primary p-1 rounded-full mb-3">
            <Image
              source={session?.user.image || profile}
              className="w-20 h-20 rounded-full"
            />
          </View>

          <Text className="text-xl font-Poppins-ExtraBold text-white">
            {session?.user.name}
          </Text>
          <Text className="text-gray-300 mt-1 font-Poppins-Medium ">
            {session?.user.email}
          </Text>
        </View>

        {/* ===== SAFETY & SUPPORT ===== */}
        <View className="bg-red-900/30 rounded-2xl p-5 mt-5 border border-red-500">
          <View className="flex-row items-center gap-2 mb-2">
            <HeartPulse size={20} color="#ef4444" />
            <Text className="text-red-400 font-bold">Safety & Support</Text>
          </View>

          <Text className="text-gray-200 text-sm">
            If you’re feeling overwhelmed or unsafe, please seek help
            immediately. You’re not alone.
          </Text>

          <TouchableOpacity className="bg-red-500 rounded-full p-3 mt-3">
            <Text className="text-white text-center font-bold">
              Get Helpline Support
            </Text>
          </TouchableOpacity>
        </View>

        {/* ===== SETTINGS ===== */}
        <View className="bg-card rounded-2xl p-5 mt-5 mb-10 shadow">
          <Text className="text-lg font-bold text-white mb-3">Settings</Text>
          <SettingItem icon={Bell} label="Notifications" />
          <SettingItem icon={Shield} label="Privacy & Data" />

          <TouchableOpacity
            className="flex-row items-center gap-3 mt-4"
            onPress={handleLogout}
          >
            <LogOut size={20} color="#ef4444" />
            <Text className="text-red-500 font-Inter-Bold text-lg">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
