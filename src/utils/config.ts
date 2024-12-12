import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT,
  databaseUrl: process.env.MONGODB_URI,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinarySecret: process.env.CLOUDINARY_API_SECRET,
  frontendDomain: process.env.FRONTEND_DOMAIN,
  corsOrigin :process.env.CORS_ORIGIN,
  accessToken:process.env.ACCESS_TOKEN_SECRET,
  accessTokenExpiry:process.env.ACCESS_TOKEN_EXPIRY,
  refreshToken:process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiry:process.env.REFRESH_TOKEN_EXPIRY,
  geminiApiKey:process.env.GEMINI_API_KEY
};

export const config = Object.freeze(_config);