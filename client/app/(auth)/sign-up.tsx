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
import { Lock, Mail, User } from "lucide-react-native";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import Checkbox from "@/components/ui/Checkbox";
const SignUp = () => {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white px-5 mt-4">
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
          <View className="flex-1 items-center gap-4 px-3">
            <Image source={logo} className="w-40 h-w-40" resizeMode="contain" />
            <Text className="font-Poppins-ExtraBold text-3xl">
              Let’s Get Started!
            </Text>
            <Text className="font-Poppins-Medium text-center">
              Create your account and begin your journey to better habits and
              mental well-being.
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
            <CustomInput
              label="Name"
              icon={User}
              placeholder="Enter your name"
            />
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
            <Checkbox
              title="I agree to the MindMate Terms & Conditions"
              style="mt-5"
            />
            <CustomButton title="Sign In" style="mt-3 w-full" />
            <TouchableOpacity
              className="mt-3"
              onPress={() => router.push("/(auth)/sign-in")}
            >
              <Text className=" font-Poppins-Bold text-center">
                Already have an account?
                <Text className="text-primary"> Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
