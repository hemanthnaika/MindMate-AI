import { logo } from "@/assets/icons";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Checkbox from "@/components/ui/Checkbox";
import { signUp } from "@/services/auth.services";
import Feather from "@expo/vector-icons/Feather";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Lock, Mail, User } from "lucide-react-native";
import React, { useState } from "react";
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

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const [accepted, setAccepted] = useState(false);
  const [acceptError, setAcceptError] = useState(false);

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      toast.success("Signed up successfully");
      router.replace("/(tabs)");
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });
  const handleSignIn = (data: SignUpProps) => {
    if (!accepted) {
      setAcceptError(true);
      return;
    }
    mutation.mutate(data);
  };

  const isDisabled = mutation.isPending;

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-secondary px-5 pt-4">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            className=" rounded-lg self-start px-5 py-2 bg-primary"
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-primary font-Plus-Bold font-extrabold text-2xl">
            MindMate-AI
          </Text>
          <View />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-1 items-center gap-4 p-10 bg-neutral/90 mt-10 rounded-lg">
            <Image source={logo} className="w-20 h-20" resizeMode="contain" />
            <Text className="font-Plus-Bold text-white text-3xl">
              Let’s Get Started!
            </Text>
            <Text className="font-Plus-Bold text-white text-center">
              Create your account and begin your journey to better habits and
              mental well-being.
            </Text>

            <Controller
              name="name"
              control={control}
              rules={{
                required: "Name is required",
                min: 3,
              }}
              render={({ field: { onChange, value } }) => (
                <View className="px-5">
                  <CustomInput
                    label="Name"
                    placeholder="Enter your name"
                    onChangeText={onChange}
                    value={value}
                    icon={User}
                    error={!!errors.name}
                    editable={!isDisabled}
                  />
                  {errors.name && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </Text>
                  )}
                </View>
              )}
            />
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
                    placeholder="name@example.com"
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
            <View className="mt-5 flex-row items-center gap-3 px-5">
              <Checkbox
                checked={accepted}
                onToggle={(value) => {
                  setAccepted(value);
                  if (value) setAcceptError(false);
                }}
                checkStyle="w-6 h-6"
              />
              <Text className="text-sm font-Plus-Medium text-white">
                I agree to the Terms & Conditions
              </Text>
            </View>

            {acceptError && (
              <Text className="text-red-500 text-sm mt-1 px-5 font-Inter-Bold ">
                Please accept the terms to continue
              </Text>
            )}

            <CustomButton
              isLoading={mutation.isPending}
              title="Sign In"
              style="mt-2 w-full bg-primary"
              onPress={handleSubmit(handleSignIn)}
            />
            <TouchableOpacity
              className="mt-3"
              onPress={() => router.push("/(auth)/sign-in")}
            >
              <Text className=" font-Plus-Bold text-white text-center text-md">
                Already have an account?{" "}
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
