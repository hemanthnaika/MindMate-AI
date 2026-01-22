import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { google, logo } from "@/assets/icons";
import CustomInput from "@/components/CustomInput";
import { Lock, Mail, User } from "lucide-react-native";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { signUp } from "@/services/auth.services";
import { toast } from "sonner-native";
import Checkbox from "@/components/ui/Checkbox";

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
              or sign up with email
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
            <View className="mt-5 flex-row items-center gap-3 px-5">
              <Checkbox
                checked={accepted}
                onToggle={(value) => {
                  setAccepted(value);
                  if (value) setAcceptError(false);
                }}
                checkStyle="w-6 h-6"
              />
              <Text className="text-sm font-Poppins-Medium">
                I agree to the Terms & Conditions
              </Text>
            </View>

            {acceptError && (
              <Text className="text-red-500 text-sm mt-1 px-5">
                Please accept the terms to continue
              </Text>
            )}

            <CustomButton
              isLoading={mutation.isPending}
              title="Sign In"
              style="mt-2 w-full"
              onPress={handleSubmit(handleSignIn)}
            />
            <TouchableOpacity
              className="mt-3"
              onPress={() => router.push("/(auth)/sign-in")}
            >
              <Text className=" font-Poppins-Bold text-center text-md">
                Already have an account?
                <Text className="text-primary">Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
