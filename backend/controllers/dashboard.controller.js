// import Mood from "../models/mood.model.js";
// import Habit from "../models/habit.model.js";

// const HabitSummary = async (user) => {
//   const habitDoc = await Habit.findOne({ userId: user.id });
//   let totalHabits = 0;
//   let bestStreak = 0;
//   let consistencySum = 0;

//   if (habitDoc && habitDoc.habits.length > 0) {
//     totalHabits = habitDoc.habits.length;

//     habitDoc.habits.forEach((habit) => {
//       const streak = getStreak(habit.progress);
//       const consistency = getConsistency(habit.progress);

//       if (streak > bestStreak) bestStreak = streak;
//       consistencySum += consistency;
//     });
//   }
//   const avgConsistency =
//     totalHabits > 0 ? Math.round(consistencySum / totalHabits) : 0;
//   return { totalHabits, bestStreak, consistencySum, avgConsistency };
// };

// const MoodSummary = async (user) => {
//   const moodDoc = await Mood.findOne({ userId: user.id });

//   let todayMood = null;
//   let moodTrend = "no-data";

//   if (moodDoc && moodDoc.moodInfo.length > 0) {
//     const sortedMood = moodDoc.moodInfo.sort(
//       (a, b) => new Date(b.date) - new Date(a.date)
//     );

//     todayMood = sortedMood[0].mood;

//     if (sortedMood.length > 1) {
//       const yesterdayMood = sortedMood[1].mood;

//       if (todayMood > yesterdayMood) moodTrend = "up";
//       else if (todayMood < yesterdayMood) moodTrend = "down";
//       else moodTrend = "same";
//     }
//   }

//   return { todayMood, moodTrend };
// };

// const getWeeklyReport = async (user) => {
//   const dates = getLast7Days();

//   const moods = await Mood.find({
//     userId: user.id,
//     date: { $gte: dates[6] },
//   });

//   const avgMood =
//     moods.length === 0
//       ? 0
//       : (moods.reduce((sum, m) => sum + m.mood, 0) / moods.length).toFixed(1);

//   // Habit Analysis
//   const habitDoc = await Habit.findOne({ userId: user.id });
//   const habits = habitDoc?.habits || [];
//   const habitStats = calculateHabitCompletion(habits, dates);

//   // Best & Worst Habit
//   let bestHabit = null;
//   let worstHabit = null;

//   habits.forEach((h) => {
//     const completedDays = h.progress.filter((p) => p.completed).length;

//     if (!bestHabit || completedDays > bestHabit.count) {
//       bestHabit = { name: h.name, count: completedDays };
//     }

//     if (!worstHabit || completedDays < worstHabit.count) {
//       worstHabit = { name: h.name, count: completedDays };
//     }
//   });
//   return { moods, avgMood, habitStats, bestHabit, worstHabit };
// };

// const getUserInsights = async (user) => {
//   // Last 7 days data
//   const fromDate = new Date();
//   fromDate.setDate(fromDate.getDate() - 7);
//   fromDate.setHours(0, 0, 0, 0);

//   const moodDoc = await Mood.findOne({ userId: user.id });

//   const moods =
//     moodDoc?.moodInfo.filter((m) => new Date(m.date) >= fromDate) || [];

//   const habitDoc = await Habit.findOne({ userId: user.id });
//   const habits = habitDoc?.habits || [];

//   const insights = generateInsights({ moods, habits });

//   return { insights };
// };

// const safetyCheckController = async (user) => {
//   const moods = await Mood.find({
//     userId: user.id,
//     date: {
//       $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
//     },
//   });

//   const habitDoc = await Habit.findOne({ userId: user.id });
//   const habits = habitDoc ? habitDoc.habits : [];

//   const result = runSafetyCheck({ moods, habits });

//   let message = "You are doing okay. Keep going 💙";

//   if (result.riskLevel === "medium") {
//     message =
//       "We noticed some stress. Try resting or talking to someone you trust.";
//   }

//   if (result.riskLevel === "high") {
//     message =
//       "You’ve been going through a tough time. You’re not alone. Consider reaching out for support.";
//   }

//   return {
//     result,
//     message,
//     helpline:
//       result.riskLevel === "high"
//         ? "If you need help in India: 9152987821 (Mental Health Helpline)"
//         : null,
//   };
// };

// const getCalendarData = async (user) => {
//   // 1️⃣ Get all mood documents
//   const moods = await Mood.find({ userId: user.id });

//   // 2️⃣ Get habit document (one per user)
//   const habitDoc = await Habit.findOne({ userId: user.id });

//   const calendar = {};

//   // 3️⃣ Process mood data
//   moods.forEach((doc) => {
//     doc.moodInfo.forEach((m) => {
//       const dateKey = new Date(m.date).toISOString().split("T")[0];

//       calendar[dateKey] = {
//         mood: m.mood,
//         stress: m.stress,
//         sleep: m.sleep,
//         habitsCompleted: 0,
//       };
//     });
//   });

//   // 4️⃣ Process habit data
//   if (habitDoc) {
//     habitDoc.habits.forEach((habit) => {
//       habit.progress.forEach((p) => {
//         if (!p.completed) return;

//         const dateKey = new Date(p.date).toISOString().split("T")[0];

//         if (!calendar[dateKey]) {
//           calendar[dateKey] = {
//             mood: null,
//             stress: null,
//             sleep: null,
//             habitsCompleted: 1,
//           };
//         } else {
//           calendar[dateKey].habitsCompleted += 1;
//         }
//       });
//     });
//   }

//   return { calendar };
// };

// const generateProgressReport = async (user) => {
//   const fromDate = new Date();
//   fromDate.setDate(fromDate.getDate() - 30);

//   // ---------- MOOD DATA ----------
//   const moods = await Mood.find({
//     userId: user.id,
//     "moodInfo.date": { $gte: fromDate },
//   });

//   let moodTotal = 0,
//     stressTotal = 0,
//     count = 0;

//   moods.forEach((doc) => {
//     doc.moodInfo.forEach((m) => {
//       if (m.date >= fromDate) {
//         moodTotal += m.mood;
//         stressTotal += m.stress;
//         count++;
//       }
//     });
//   });

//   const avgMood = count ? (moodTotal / count).toFixed(1) : 0;
//   const avgStress = count ? (stressTotal / count).toFixed(1) : 0;

//   // ---------- HABIT DATA ----------
//   const habitDoc = await Habit.findOne({ userId: user.id });
//   let bestHabit = null;
//   let worstHabit = null;

//   if (habitDoc) {
//     const habitStats = habitDoc.habits.map((h) => ({
//       name: h.name,
//       streak: getStreak(h.progress),
//       consistency: getConsistency(h.progress),
//     }));

//     bestHabit = habitStats.sort((a, b) => b.consistency - a.consistency)[0];
//     worstHabit = habitStats.sort((a, b) => a.consistency - b.consistency)[0];
//   }

//   // ---------- SUMMARY ----------
//   let summary = "You are doing okay. Keep going.";
//   if (avgMood >= 4) summary = "You are mentally strong this month 👍";
//   else if (avgMood <= 2) summary = "You may need rest and support 💙";

//   return { avgMood, avgStress, bestHabit, worstHabit, summary };
// };
// export const DashBoardSummary = async (req, res, next) => {
//   try {
//     const user = req.session;

//     const { totalHabits, bestStreak, consistencySum, avgConsistency } =
//       await HabitSummary(user);
//     const { todayMood, moodTrend } = await MoodSummary(user);
//     const { moods, avgMood, habitStats, bestHabit, worstHabit } =
//       await getWeeklyReport(user);

//     const { insights } = await getUserInsights(user);

//     const { result, message, helpline } = await safetyCheckController(user);
//     const { calendar } = await getCalendarData(user);

//     const {
//       avgMood: avgMood30,
//       avgStress,
//       bestHabit: bestHabit30,
//       worstHabit: worstHabit30,
//       summary,
//     } = await generateProgressReport(user);

//     res.status(200).json({
//       totalHabits,
//       bestStreak,
//       consistencySum,
//       avgConsistency,
//       todayMood,
//       moodTrend,
//       moods,
//       avgMood,
//       habitStats,
//       bestHabit,
//       worstHabit,
//       insights,
//       result,
//       message,
//       helpline,
//       calendar,
//       avgMood30,
//       avgStress,
//       bestHabit30,
//       worstHabit30,
//       summary,
//     });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

import Mood from "../models/mood.model.js";
import Habit from "../models/habit.model.js";
import {
  calculateHabitCompletion,
  generateInsights,
  getConsistency,
  getLast7Days,
  getStreak,
  runSafetyCheck,
} from "../lib/helperFunctions.js";

export const DashBoardSummary = async (req, res, next) => {
  try {
    const user = req.session;

    const [habitDoc, moodDoc] = await Promise.all([
      Habit.findOne({ userId: user.id }).lean(),
      Mood.findOne({ userId: user.id }).lean(),
    ]);

    const habits = habitDoc?.habits || [];
    const moodInfo = moodDoc?.moodInfo || [];

    // ---------- date ranges ----------
    const now = Date.now();
    const last7 = now - 7 * 24 * 60 * 60 * 1000;
    const last30 = now - 30 * 24 * 60 * 60 * 1000;

    // ---------- HABIT SUMMARY ----------
    let totalHabits = habits.length;
    let bestStreak = 0;
    let consistencySum = 0;

    let bestHabit = null;
    let worstHabit = null;

    const calendar = {};

    // Pre-calc habit stats once
    habits.forEach((habit) => {
      const streak = getStreak(habit.progress);
      const consistency = getConsistency(habit.progress);

      if (streak > bestStreak) bestStreak = streak;
      consistencySum += consistency;

      const completedDays = habit.progress.filter((p) => p.completed).length;

      if (!bestHabit || completedDays > bestHabit.count) {
        bestHabit = { name: habit.name, count: completedDays };
      }
      if (!worstHabit || completedDays < worstHabit.count) {
        worstHabit = { name: habit.name, count: completedDays };
      }

      habit.progress.forEach((p) => {
        if (!p.completed) return;

        const dateKey = new Date(p.date).toISOString().split("T")[0];
        calendar[dateKey] = calendar[dateKey] || {
          mood: null,
          stress: null,
          sleep: null,
          habitsCompleted: 0,
        };
        calendar[dateKey].habitsCompleted += 1;
      });
    });

    const avgConsistency =
      totalHabits > 0 ? Math.round(consistencySum / totalHabits) : 0;

    // ---------- MOOD SUMMARY ----------
    let todayMood = null;
    let moodTrend = "no-data";

    if (moodInfo.length > 0) {
      const sortedMood = [...moodInfo].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      todayMood = sortedMood[0].mood;

      if (sortedMood.length > 1) {
        const yesterdayMood = sortedMood[1].mood;
        moodTrend =
          todayMood > yesterdayMood
            ? "up"
            : todayMood < yesterdayMood
            ? "down"
            : "same";
      }

      sortedMood.forEach((m) => {
        const dateKey = new Date(m.date).toISOString().split("T")[0];
        calendar[dateKey] = calendar[dateKey] || {
          mood: null,
          stress: null,
          sleep: null,
          habitsCompleted: 0,
        };
        calendar[dateKey].mood = m.mood;
        calendar[dateKey].stress = m.stress;
        calendar[dateKey].sleep = m.sleep;
      });
    }

    // ---------- WEEKLY REPORT ----------
    const dates = getLast7Days();
    const habitStats = calculateHabitCompletion(habits, dates);

    // ---------- INSIGHTS ----------
    const last7Moods = moodInfo.filter((m) => new Date(m.date) >= last7);
    const insights = generateInsights({ moods: last7Moods, habits });

    // ---------- SAFETY CHECK ----------
    const result = runSafetyCheck({ moods: last7Moods, habits });

    let message = "You are doing okay. Keep going 💙";
    if (result.riskLevel === "medium") {
      message =
        "We noticed some stress. Try resting or talking to someone you trust.";
    }
    if (result.riskLevel === "high") {
      message =
        "You’ve been going through a tough time. You’re not alone. Consider reaching out for support.";
    }

    const helpline =
      result.riskLevel === "high"
        ? "If you need help in India: 9152987821 (Mental Health Helpline)"
        : null;

    // ---------- 30 DAY REPORT ----------
    const last30Moods = moodInfo.filter((m) => new Date(m.date) >= last30);

    let moodTotal = 0,
      stressTotal = 0,
      count = 0;

    last30Moods.forEach((m) => {
      moodTotal += m.mood;
      stressTotal += m.stress;
      count++;
    });

    const avgMood30 = count ? (moodTotal / count).toFixed(1) : 0;
    const avgStress = count ? (stressTotal / count).toFixed(1) : 0;

    let bestHabit30 = null;
    let worstHabit30 = null;

    if (habits.length > 0) {
      const habitStats30 = habits.map((h) => ({
        name: h.name,
        streak: getStreak(h.progress),
        consistency: getConsistency(h.progress),
      }));

      bestHabit30 = habitStats30.reduce((a, b) =>
        b.consistency > a.consistency ? b : a
      );
      worstHabit30 = habitStats30.reduce((a, b) =>
        b.consistency < a.consistency ? b : a
      );
    }

    let summary = "You are doing okay. Keep going.";
    if (avgMood30 >= 4) summary = "You are mentally strong this month 👍";
    else if (avgMood30 <= 2) summary = "You may need rest and support 💙";

    res.status(200).json({
      totalHabits,
      bestStreak,
      consistencySum,
      avgConsistency,
      todayMood,
      moodTrend,
      habitStats,
      bestHabit,
      worstHabit,
      insights,
      result,
      message,
      helpline,
      calendar,
      avgMood30,
      avgStress,
      bestHabit30,
      worstHabit30,
      summary,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
