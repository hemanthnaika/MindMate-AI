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
          <View className="flex-1 items-center gap-4 px-3 bg-neutral/90 p-10 mt-10 rounded-2xl">
            <Image source={logo} className="w-20 h-20" resizeMode="contain" />
            <Text className="font-Plus-Bold text-white text-5xl">
              Welcome Back
            </Text>
            <Text className="text-white font-Plus-Bold text-md">
              Continue your journey to wellness.
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
                <View className="px-5 mt-10">
                  <CustomInput
                    label="Email Address"
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

            <CustomButton
              isLoading={mutation.isPending}
              title="Sign In"
              style="mt-5 w-full bg-primary"
              onPress={handleSubmit(handleSignIn)}
            />
            <TouchableOpacity
              className="mt-8"
              onPress={() => router.push("/(auth)/sign-up")}
            >
              <Text className=" font-Plus-Bold text-center text-white text-md">
                Don’t have an account?
                <Text className="text-primary"> Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center justify-between mt-10 px-10">
            <Text className="text-primary  font-Plus-Bold text-md">
              Privacy Policy
            </Text>
            <Text className="text-primary font-Plus-Bold text-md">
              Term of Service
            </Text>
            <Text className="text-primary font-Plus-Bold text-md">
              Help center
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
