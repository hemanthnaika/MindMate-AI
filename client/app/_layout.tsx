import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner-native";
export default function RootLayout() {
  const queryClient = new QueryClient();
  const [fontsLoaded, error] = useFonts({
    "Plus-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Plus-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Plus-Bold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
  });
  useEffect(() => {
    if (error) throw error;
    const Prepare = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    Prepare();
  }, [fontsLoaded, error]);
  return (
    <GestureHandlerRootView className="flex-1">
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} />
        <Toaster position="bottom-center" theme="light" />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
