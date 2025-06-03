import {getRedisClient} from "./redis.client";
import {convertToSeconds} from "../../utils/jwt"
import logger from "../../logger";

export async function storeUserToken (userId: string, token: string, expiryTime: string | number = '24h'): Promise<void>  {
    try{
        const client = getRedisClient()
        const time = convertToSeconds(expiryTime)
        await client.set(`user_token:${userId}`, token, {EX: time})
    }catch (e) {
        logger.error('Error in storeUserToken function', e)
        throw e
    }
}

export async function getUserToken(userId: string) {
    try{
        const client = getRedisClient()
        return await client.get(`user_token:${userId}`)
    }catch (e) {
        logger.error('Error in getUserToken function', e)
        throw e
    }
}


export async function deleteUserToken(userId: string): Promise<void> {
    try {
        const client = getRedisClient()
        await client.del(`user_token:${userId}`);
    } catch (e) {
        logger.error('Error deleting user token:', e);
        throw e;
    }
}