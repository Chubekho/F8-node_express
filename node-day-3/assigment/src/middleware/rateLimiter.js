const createRateLimiter = ({
  windowMs = 60000,
  maxRequests = 100,
  message = "Too many requests",
}) => {
  const requests = {};

  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    if (!requests[ip] || now > requests[ip].resetTime) {
      requests[ip] = { count: 0, resetTime: now + windowMs };
    }

    requests[ip].count++;

    if (requests[ip].count > maxRequests) {
      return res.error(429, message);
    }

    next();
  };
};

const apiRateLimiter = createRateLimiter({
  windowMs: 60000,
  maxRequests: 100,
  message: "Too many requests",
});

module.exports = { createRateLimiter, apiRateLimiter };
