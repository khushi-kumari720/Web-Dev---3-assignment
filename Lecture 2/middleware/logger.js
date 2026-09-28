// Custom logger middleware - logs method, URL, status code and response time

function logger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const time = new Date().toISOString();
    console.log(
      `[${time}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`
    );
  });

  next();
}

module.exports = logger;
