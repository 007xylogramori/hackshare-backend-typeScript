import rateLimit from "express-rate-limit";
export const globalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too Many requests RATE_LIMIT_ERROR",
});
export const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 5, // Limit each IP to 5 requests per `window` (here, per 1 minutes)
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too Many requests RATE_LIMIT_ERROR",
});

