import dotenv from "dotenv";
dotenv.config();

if (!process.env.PORT) {
  throw new Error("PORT in not defined in env file.");
}
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI in not defined in env file.");
}
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET in not defined in env file.");
}

const config = {
  PORT: process.env.PORT || 5000,
  MONGO: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
