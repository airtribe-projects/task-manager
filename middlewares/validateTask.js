const validateTask = (req, res, next) => {
  const { title, description, completed } = req.body;
  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof completed !== "boolean"
  ) {
    return res.status(400).json({ message: "Invalid types/ Missing fields" });
  }
  next();
};

module.exports = { validateTask };
