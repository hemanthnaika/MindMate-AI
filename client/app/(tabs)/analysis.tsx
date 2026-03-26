import CustomHeader from "@/components/CustomHeader";
import { getUserAnalysis } from "@/services/analysis.services";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import {
  Award,
  Brain,
  CircleDot,
  Infinity,
  Medal,
  Sparkles,
  SquareChartGantt,
  ThumbsDown,
  TrendingUp,
} from "lucide-react-native";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StatCard = ({ label, value }: { label: string; value: any }) => (
  <View className="bg-card rounded-2xl p-4 w-[48%] mb-4 shadow-sm">
    <Text className="text-xs font-Plus-Bold text-gray-300 mb-1">{label}</Text>
    <Text className="text-3xl font-Plus-Medium text-white">{value}</Text>
  </View>
);

const Analysis = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["analysis"],
    queryFn: getUserAnalysis,
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-secondary">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View className="flex-1 justify-center items-center bg-secondary">
        <Text className="text-red-500 font-Plus-Bold">
          Failed to load analysis
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-secondary">
      <SafeAreaView className="px-7 bg-neutral pb-5">
        <CustomHeader
          title="Analysis Dashboard "
          onPress={() => router.back()}
        />
      </SafeAreaView>
      <SafeAreaView edges={["bottom"]} className="px-7 mt-5">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-white font-Plus-Bold text-lg">
            - Daily Summary
          </Text>
          <Text className="text-4xl font-Plus-Bold text-white mt-5">
            {data.summary}
          </Text>
          <Text className="mt-3 text-white font-Plus-Bold text-lg">
            {data.message}
          </Text>
          <View className="bg-neutral flex-row items-center p-5 gap-5 mt-5 rounded-lg">
            <View className=" bg-primary p-3 rounded-full">
              <TrendingUp size={30} color="#fff" />
            </View>
            <View className="">
              <Text className="text-white font-Plus-Medium text-lg ">
                Today&apos;s Pulse
              </Text>
              <Text className="text-white font-Plus-Bold text-lg ">
                {" "}
                Mood: {data.todayMood}
              </Text>
              <Text className="text-primary font-Plus-Bold text-lg  ">
                {" "}
                Trend: {data.moodTrend}
              </Text>
            </View>
          </View>

          <View className="bg-neutral  mt-5 p-5 gap-5 rounded-lg">
            <View className="flex-row justify-between items-center  ">
              <Text className="text-md font-Plus-Medium text-white">
                Avg Mood (30d)
              </Text>
              <SquareChartGantt color={"#76A1B5"} />
            </View>
            <Text className="font-Plus-Bold text-5xl text-white ">
              {data.avgMood30}
            </Text>
          </View>

          <View className="bg-neutral  mt-5 p-5 gap-5 rounded-lg">
            <View className="flex-row justify-between items-center  ">
              <Text className="text-md font-Plus-Medium text-white">
                Avg Stress
              </Text>
              <Brain color={"#76A1B5"} />
            </View>

            <Text className="font-Plus-Bold text-5xl text-white ">
              {data.avgStress}
            </Text>
          </View>

          <View className="bg-neutral  mt-5 p-5 gap-5 rounded-lg">
            <View className="flex-row justify-between items-center">
              <Text className="text-md font-Plus-Medium text-white">
                Consistency
              </Text>
              <Infinity color={"#76A1B5"} />
            </View>

            <Text className="font-Plus-Bold text-5xl text-white ">
              {data.avgConsistency}%
            </Text>
          </View>

          <Text className="text-white mt-5 font-Plus-Bold text-2xl">
            Habits Overview
          </Text>

          <View className="flex-row items-center  gap-5 ">
            <View className="bg-neutral  mt-5 p-5 gap-5 flex-1 rounded-lg">
              <Text className="text-md font-Plus-Medium text-white">
                Completion
              </Text>
              <Text className="font-Plus-Bold text-5xl text-white ">
                {data.habitStats.completed} / {data.totalHabits}{" "}
                <Text className="text-sm">{data.habitStats.percentage}%</Text>
              </Text>
            </View>

            <View className="bg-neutral  mt-5 p-5 gap-5 flex-1 rounded-lg">
              <View className="flex-row justify-between items-center  ">
                <Text className="text-md font-Plus-Medium text-white">
                  Current Streak
                </Text>
                <Medal color={"#76A1B5"} />
              </View>
              <Text className="font-Plus-Bold text-5xl text-white ">
                {data.bestStreak}
              </Text>
            </View>
          </View>

          <View className="bg-neutral mt-5 p-5 flex-row items-center gap-5 rounded-lg">
            <View className="bg-primary/50 p-2 rounded-xl">
              <Award color={"#76A1B5"} />
            </View>
            <Text className="text-white font-Plus-Bold text-lg ">
              Best Habit:{"   "}
              {data.bestHabit?.name}
            </Text>
          </View>

          <View className="bg-neutral mt-5 p-5 flex-row items-center gap-5 rounded-lg">
            <View className="bg-red-500 p-2 rounded-xl">
              <ThumbsDown color={"#76A1B5"} />
            </View>
            <Text className="text-white font-Plus-Bold text-lg">
              Worst Habit:{"   "}
              {data.worstHabit30?.name}
            </Text>
          </View>

          <View className="bg-neutral mt-5 rounded-2xl p-5">
            {/* Header */}
            <View className="flex-row items-center gap-3 mb-10">
              <Sparkles size={28} color="#76A1B5" />
              <Text className="font-Plus-Bold text-xl text-white ">
                Deep Insight
              </Text>
            </View>

            {data?.insights?.map((insight: string, index: number) => (
              <View key={index} className="flex-row items-start gap-3 mb-3">
                <CircleDot size={18} color="#76A1B5" />

                <Text className="flex-1 text-white font-Plus-Medium text-base leading-6">
                  {insight}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Analysis;
