import { getUserAnalysis } from "@/services/analysis.services";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StatCard = ({ label, value }: { label: string; value: any }) => (
  <View className="bg-card rounded-2xl p-4 w-[48%] mb-4 shadow-sm">
    <Text className="text-xs font-Poppins-Bold text-gray-300 mb-1">
      {label}
    </Text>
    <Text className="text-3xl font-Inter-Medium text-white">{value}</Text>
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
        <Text className="text-red-500 font-Inter-Medium">
          Failed to load analysis
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ===== SUMMARY ===== */}
        <View className="bg-card rounded-2xl p-5 mt-4 mb-6 shadow">
          <Text className="text-lg font-Poppins-Bold text-white mb-2">
            Daily Summary
          </Text>
          <Text className="text-md font-Inter-Medium text-white leading-6">
            {data.summary}
          </Text>
          <Text className="mt-3 text-blue-500 font-Inter-Medium">
            {data.message}
          </Text>
        </View>

        {/* ===== STATS ===== */}
        <Text className="text-white font-Poppins-Bold text-lg mb-3">
          Your Stats
        </Text>
        <View className="flex-row flex-wrap justify-between">
          <StatCard label="Avg Mood (30d)" value={data.avgMood30} />
          <StatCard label="Avg Stress" value={data.avgStress} />
          <StatCard label="Consistency %" value={`${data.avgConsistency}%`} />
          <StatCard label="Best Streak 🔥" value={data.bestStreak} />
        </View>

        {/* ===== TODAY ===== */}
        <View className="bg-card rounded-2xl p-5 mb-6 shadow">
          <Text className="font-Poppins-Bold text-white mb-3 text-lg">
            Today
          </Text>
          <Text className="font-Inter-Medium text-white text-md mb-1">
            Mood: {data.todayMood}
          </Text>
          <Text className="font-Inter-Medium text-white text-md">
            Mood Trend: {data.moodTrend}
          </Text>
        </View>

        {/* ===== HABITS ===== */}
        <View className="bg-card rounded-2xl p-5 mb-6 shadow">
          <Text className="font-Poppins-Bold text-white text-lg mb-3">
            Habits Overview
          </Text>

          <View className="space-y-1">
            <Text className="text-white font-Inter-Medium text-md">
              Total Habits: {data.totalHabits}
            </Text>
            <Text className="text-white font-Inter-Medium text-md">
              Completed: {data.habitStats.completed} / {data.habitStats.total}
            </Text>
            <Text className="text-white font-Inter-Medium text-md">
              Completion: {data.habitStats.percentage}%
            </Text>
          </View>

          <View className="mt-4 border-t border-gray-700 pt-3">
            <Text className="font-Inter-Medium text-green-500 text-md">
              Best Habit: {data.bestHabit?.name} ({data.bestHabit?.count})
            </Text>
            <Text className="font-Inter-Medium text-red-500 mt-2 text-md">
              Worst Habit: {data.worstHabit30?.name}
            </Text>
          </View>
        </View>

        {/* ===== INSIGHTS ===== */}
        <View className="bg-card rounded-2xl p-5 shadow">
          <Text className="font-Poppins-Bold text-lg text-white mb-3">
            Insights
          </Text>

          {data.insights.map((insight: string, index: number) => (
            <Text
              key={index}
              className="text-white font-Inter-Medium mb-2 leading-6"
            >
              • {insight}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Analysis;
