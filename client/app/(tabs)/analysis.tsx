import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getUserAnalysis } from "@/services/analysis.services";
import { SafeAreaView } from "react-native-safe-area-context";

const StatCard = ({ label, value }: { label: string; value: any }) => (
  <View className="bg-card rounded-xl p-4 w-[48%] mb-3">
    <Text className="text-sm font-Poppins-Bold text-white ">{label}</Text>
    <Text className="text-2xl font-Inter-Medium text-white">{value}</Text>
  </View>
);

const Analysis = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["analysis"],
    queryFn: getUserAnalysis,
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Failed to load analysis</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <ScrollView className="flex-1  px-4 pt-4">
        {/* ===== SUMMARY ===== */}
        <View className="bg-card rounded-xl p-4 mb-4 shadow">
          <Text className="text-lg font-Poppins-Bold mb-1 text-white">
            Daily Summary
          </Text>
          <Text className="text-md font-Inter-Medium text-white">
            {data.summary}
          </Text>
          <Text className="mt-2 text-blue-600 font-semibold">
            {data.message}
          </Text>
        </View>

        {/* ===== STATS ===== */}
        <View className="flex-row flex-wrap justify-between">
          <StatCard label="Avg Mood (30d)" value={data.avgMood30} />
          <StatCard label="Avg Stress" value={data.avgStress} />
          <StatCard label="Consistency %" value={`${data.avgConsistency}%`} />
          <StatCard label="Best Streak 🔥" value={data.bestStreak} />
        </View>

        {/* ===== TODAY MOOD ===== */}
        <View className="bg-card rounded-xl p-4 mt-2 mb-4 shadow">
          <Text className="font-bold mb-2 text-white font-Poppins-Bold">
            Today
          </Text>
          <Text className="font-Inter-Medium text-white text-md">
            Mood: {data.todayMood}
          </Text>
          <Text className="font-Inter-Medium text-white text-md">
            Mood Trend: {data.moodTrend}
          </Text>
        </View>

        {/* ===== HABITS ===== */}
        <View className="bg-card rounded-xl p-4 mb-4 shadow">
          <Text className="font-Poppins-Bold mb-2 text-white text-md ">
            Habits Overview
          </Text>

          <Text className="text-white font-Inter-Medium text-md">
            Total Habits: {data.totalHabits}
          </Text>
          <Text className="text-white font-Inter-Medium text-md">
            Completed: {data.habitStats.completed} / {data.habitStats.total}
          </Text>
          <Text className="text-white font-Inter-Medium text-md">
            Completion: {data.habitStats.percentage}%
          </Text>

          <View className="mt-3">
            <Text className="font-Inter-Medium text-green-600 text-md">
              Best Habit: {data.bestHabit?.name} ({data.bestHabit?.count})
            </Text>
            <Text className="font-Inter-Medium text-red-600 mt-1 text-md">
              Worst Habit: {data.worstHabit30?.name}
            </Text>
          </View>
        </View>

        {/* ===== INSIGHTS ===== */}
        <View className="bg-card rounded-xl p-4 mb-6 shadow">
          <Text className="font-Poppins-Bold mb-2 text-lg text-white">
            Insights
          </Text>

          {data.insights.map((insight: string, index: number) => (
            <Text key={index} className="text-white font-Inter-Medium mb-2">
              • {insight}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Analysis;
