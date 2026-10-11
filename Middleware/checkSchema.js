export const checkSchema = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body ?? {});
  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`),
    });
  }
  req.body = result.data;
  next();
};