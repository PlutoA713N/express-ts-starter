// redisClient.ts
import {config} from "dotenv";
import { createClient } from "redis";
import logger from "../../logger";

config()

const url = process.env.REDIS_CLIENT_URL;
export const client = createClient({ url:  url});

export async function initRedis() {
    client.on('error', (err) => {
        logger.error('Redis error:', err);
    });

    client.on('connect', () => {
        logger.info('Redis connected');
    });

    await client.connect();
}


export async function closeRedis() {
    await client.quit();
    logger.info('Redis connection closed');
}