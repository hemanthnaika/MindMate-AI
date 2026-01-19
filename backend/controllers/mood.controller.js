import Mood from "../models/mood.model.js";
export const MoodAdd = async (req, res, next) => {
  try {
    const user = req.session;

    const { mood, stress, sleep, note } = req.body;
    if (!mood || !stress || !sleep) {
      const error = new Error("Required fields are missing");
      error.status = 400;
      throw error;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    let userMood = await Mood.findOne({ userId: user.id });

    if (!userMood) {
      await Mood.create({
        userId: user.id,
        moodInfo: [{ mood, sleep, stress, note, date: today }],
      });

      return res.status(200).json({ success: true, message: "Mood added" });
    }

    const todayMood = userMood.moodInfo.find(
      (m) => m.date >= today && m.date < tomorrow
    );

    if (todayMood) {
      todayMood.mood = mood;
      todayMood.stress = stress;
      todayMood.sleep = sleep;
      todayMood.note = note;
      await userMood.save();
      return res.status(200).json({ success: true, message: "Mood updated" });
    } else {
      userMood.moodInfo.push({ mood, sleep, stress, note, date: today });
      await userMood.save();
      return res.status(200).json({ success: true, message: "Mood added" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
