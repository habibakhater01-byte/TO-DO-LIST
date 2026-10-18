export const safe = (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (err) {
    console.error(`${req.method} ${req.originalUrl} failed:`, err);
    res.status(500).json({ error: "Internal server error" });
  }
};