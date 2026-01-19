const getStreak = (progress) => {
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

const getConsistency = (progress) => {
  if (!progress || progress.length === 0) return 0;

  const completedDays = progress.filter((p) => p.completed).length;
  const totalDays = progress.length;

  return Math.round((completedDays / totalDays) * 100);
};
