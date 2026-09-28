// Centralized error-handling middleware.
// Routes call next(err) with an err that has a `.status` property,
// this middleware turns it into a consistent JSON error response.

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Internal server error";

  if (status === 500) {
    console.error(err.stack);
  }

  res.status(status).json({ success: false, message });
}

// Helper to build an error with a status code attached
function createError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

module.exports = { errorHandler, createError };
