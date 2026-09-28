const express = require("express");
const logger = require("./middleware/logger");
const { errorHandler, createError } = require("./middleware/errorHandler");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.use("/students", studentRoutes);

// 404 handler for unknown routes
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

// Centralized error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Student Management API (v2) running on http://localhost:${PORT}`);
});
