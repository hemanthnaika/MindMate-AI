import { logo } from "@/assets/icons";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/services/auth.services";
import Feather from "@expo/vector-icons/Feather";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      toast.success("Logged in successfully");
      router.replace("/(tabs)");
    },
    onError: (error: any) => {
      const message =
        error?.message || error?.error?.message || "Something went wrong";

      toast.error(message);
    },
  });
  const handleSignIn = (data: SignInProps) => {
    mutation.mutate(data);
  };

  const isDisabled = mutation.isPending;

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
              Welcome Back
            </Text>
            <Text className="font-Poppins-Medium text-center">
              Sign in to continue your journey toward better habits and mental
              wellness.
            </Text>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <View className="px-5">
                  <CustomInput
                    label="Email"
                    placeholder="Enter your email"
                    onChangeText={onChange}
                    value={value}
                    keyboardType="email-address"
                    icon={Mail}
                    error={!!errors.email}
                    editable={!isDisabled}
                  />
                  {errors.email && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
              }}
              render={({ field: { onChange, value } }) => (
                <View className="px-5">
                  <CustomInput
                    label="Password"
                    placeholder="Enter your password"
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={true}
                    icon={Lock}
                    error={!!errors.password}
                    editable={!isDisabled}
                  />
                  {errors.password && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <TouchableOpacity className="mt-5">
              <Text className="font-Poppins-Bold text-right text-primary">
                Forgot Password
              </Text>
            </TouchableOpacity>

            <CustomButton
              isLoading={mutation.isPending}
              title="Sign In"
              style="mt-5 w-full"
              onPress={handleSubmit(handleSignIn)}
            />
            <TouchableOpacity
              className="mt-8"
              onPress={() => router.push("/(auth)/sign-up")}
            >
              <Text className=" font-Poppins-Bold text-center">
                Don’t have an account?
                <Text className="text-primary"> Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
