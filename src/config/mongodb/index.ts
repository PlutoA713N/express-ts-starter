import { config } from "dotenv";

config();

export const mongoDBConfig = {
    mongoUri: process.env.MONGO_URI,
    retryCount: Number(process.env.DB_RETRY_COUNT || 5),
    retryDelay: Number(process.env.DB_RETRY_DELAY_MS || 3000),
    nodeEnv: process.env.NODE_ENV,
};
