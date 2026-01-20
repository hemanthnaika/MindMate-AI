export const getStreak = (progress) => {
  let streak = 0;

  const sorted = progress
    .filter((p) => p.completed)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  let day = new Date();
  day.setHours(0, 0, 0, 0);

  for (let p of sorted) {
    const d = new Date(p.date);
    d.setHours(0, 0, 0, 0);
    if (d.getTime() === day.getTime()) {
      streak++;
      day.setDate(day.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

export const getConsistency = (progress) => {
  if (!progress || progress.length === 0) return 0;

  const completedDays = progress.filter((p) => p.completed).length;
  const totalDays = progress.length;

  return Math.round((completedDays / totalDays) * 100);
};

export const getLast7Days = () => {
  const dates = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d);
  }

  return dates;
};

export const calculateHabitCompletion = (habits, dates) => {
  let total = 0;
  let completed = 0;

  habits.forEach((habit) => {
    dates.forEach((date) => {
      total++;
      const found = habit.progress.find(
        (p) => new Date(p.date).toDateString() === date.toDateString()
      );
      if (found && found.completed) completed++;
    });
  });

  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, total, percentage };
};

export const generateInsights = ({ moods, habits }) => {
  const insights = [];

  // 🟡 Insight 1: Mood trend
  const avgMood = moods.reduce((sum, m) => sum + m.mood, 0) / moods.length || 0;

  if (avgMood <= 2.5) {
    insights.push(
      "Your mood has been low recently. Try reducing stress and maintaining daily habits."
    );
  } else if (avgMood >= 4) {
    insights.push(
      "Your mood has been positive recently. Keep following your healthy routines."
    );
  }

  // 🟡 Insight 2: High stress detection
  const highStressDays = moods.filter((m) => m.stress >= 4).length;

  if (highStressDays >= 3) {
    insights.push(
      "You experienced high stress on multiple days. Consider meditation or breathing exercises."
    );
  }

  // 🟡 Insight 3: Habit consistency check
  habits.forEach((habit) => {
    const total = habit.progress.length;
    const completed = habit.progress.filter((p) => p.completed).length;
    const consistency = total ? (completed / total) * 100 : 0;

    if (consistency < 40) {
      insights.push(
        `You often skip the habit "${habit.name}". Try making it easier or reducing frequency.`
      );
    } else if (consistency >= 80) {
      insights.push(
        `Great job staying consistent with "${habit.name}". This habit is benefiting you.`
      );
    }
  });

  // 🟡 Insight 4: No habits completed recently
  const anyHabitDone = habits.some((h) => h.progress.some((p) => p.completed));

  if (!anyHabitDone) {
    insights.push(
      "You haven't completed any habits recently. Start small to rebuild momentum."
    );
  }

  // Fallback insight
  if (insights.length === 0) {
    insights.push(
      "You are doing okay overall. Stay consistent and take care of yourself."
    );
  }

  return insights;
};

export const runSafetyCheck = ({ moods, habits }) => {
  let riskLevel = "low";
  let reasons = [];

  // ---- RULE 1: LOW MOOD CHECK ----
  const lowMoodDays = moods.filter((m) => m.mood <= 2).length;

  if (lowMoodDays >= 5) {
    riskLevel = "high";
    reasons.push("Low mood for several days");
  }

  // ---- RULE 2: HIGH STRESS CHECK ----
  const highStressDays = moods.filter((m) => m.stress >= 4).length;

  if (highStressDays >= 5) {
    riskLevel = "high";
    reasons.push("High stress for many days");
  }

  // ---- RULE 3: NO HABITS COMPLETED ----
  const habitProgress = habits.flatMap((h) => h.progress);
  const completedHabits = habitProgress.filter((p) => p.completed).length;

  if (completedHabits === 0 && moods.length >= 7) {
    riskLevel = "medium";
    reasons.push("No habits completed recently");
  }

  return {
    riskLevel,
    reasons,
  };
};
