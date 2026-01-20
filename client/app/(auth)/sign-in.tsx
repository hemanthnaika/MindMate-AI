import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { google, logo } from "@/assets/icons";
import CustomInput from "@/components/CustomInput";
import { Lock, Mail } from "lucide-react-native";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
const SignIn = () => {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white px-5 mt-5">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity
          className="bg-[#ffffff] rounded-lg self-start px-5 py-2 "
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-1 items-center justify-center gap-5 px-5">
            <Image source={logo} className="w-40 h-w-40" resizeMode="contain" />
            <Text className="font-Poppins-ExtraBold text-3xl">
              Welcome Back
            </Text>
            <Text className="font-Poppins-Medium text-center">
              Sign in to continue your journey toward better habits and mental
              wellness.
            </Text>
            <TouchableOpacity className="flex-row items-center gap-5 bg-[#ffffff]  py-3 w-full rounded-full justify-center border border-lightGrey ">
              <Image
                source={google}
                className="w-10 h-10"
                resizeMode="contain"
              />
              <Text className="font-Poppins-Bold">Continue with Google</Text>
            </TouchableOpacity>
            <Text className="font-Poppins-ExtraBold text-center">
              or Continue with email
            </Text>
            <View className="w-full gap-8">
              <CustomInput
                label="Email"
                icon={Mail}
                placeholder="Enter your email"
              />
              <CustomInput
                label="Password"
                icon={Lock}
                placeholder="Enter your password"
              />
            </View>
            <TouchableOpacity>
              <Text className="text-primary font-Poppins-Bold text-center">
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>
          <CustomButton title="Sign In" style="mt-5" />
          <TouchableOpacity className="mt-8">
            <Text className=" font-Poppins-Bold text-center">
              Don&apos;t have an account?{" "}
              <Text className="text-primary">Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
