export const authMiddleware = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    req.session = session;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
