import {config} from "dotenv";
import {getEnv} from "../env";
config();

export const mongoDBConfig = {
    mongoUri: getEnv('MONGO_URI'),
    retryCount: Number(getEnv('DB_RETRY_COUNT') || 5),
    retryDelay: Number(getEnv('DB_RETRY_DELAY_MS') || 3000),
    nodeEnv: getEnv('NODE_ENV'),
};
