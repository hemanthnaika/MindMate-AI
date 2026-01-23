import Mood from "../models/mood.model.js";
export const MoodAdd = async (req, res, next) => {
  try {
    const user = req.session;

    const { mood, stress, sleep } = req.body;
    if (mood === undefined || stress === undefined || sleep === undefined) {
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
        moodInfo: [{ mood, sleep, stress, date: today }],
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
      await userMood.save();
      return res.status(200).json({ success: true, message: "Mood updated" });
    } else {
      userMood.moodInfo.push({ mood, sleep, stress, date: today });
      await userMood.save();
      return res.status(200).json({ success: true, message: "Mood added" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getUserMood = async (req, res, next) => {
  try {
    const user = req.session;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const userMood = await Mood.findOne({ userId: user.id });

    if (!userMood) {
      return res.status(200).json({
        success: true,
        data: null,
        message: "No mood for today",
      });
    }

    const todayMood = userMood.moodInfo.find(
      (m) => m.date >= today && m.date < tomorrow
    );

    return res.status(200).json({
      success: true,
      data: todayMood || null,
    });
  } catch (error) {
    next(error);
  }
};
