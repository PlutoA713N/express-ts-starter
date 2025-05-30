// redisClient.ts
import {config} from "dotenv";
import { createClient } from "redis";

config()

const url = process.env.REDIS_CLIENT_URL;
export const client = createClient({ url:  url});

export async function initRedis() {
    client.on('error', (err) => {
        console.error('Redis error:', err);
        process.exit(1);
    });

    client.on('connect', () => {
        console.log('Redis connected');
    });

    await client.connect();
}


export async function closeRedis() {
    await client.quit();
    console.log('Redis connection closed');
}