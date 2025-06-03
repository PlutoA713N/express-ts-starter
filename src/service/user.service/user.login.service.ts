import {comparePassword} from "../../utils/auth";
import {jwtSign} from "../../utils/jwt";
import {storeUserToken} from "../../config/redis/redis.utils";
import {findUserByField} from "../../models/mongo_operations/mongo_utils";
import {createApiError} from "../../factory/create.api.error";
import logger from "../../logger";
import HTTP from "http-status-codes";
import {USER_CODES} from "../../constants/error.constants";
import {USER_ERROR_DETAILS} from "../../constants/error.details.constants";

export async function userLoginService(email: string, username: string, password: string) {
    try{
        const formData = {
            username, email
        }

        const user = await findUserByField(formData)

        if (!user) {
            throw createApiError({status:HTTP.UNAUTHORIZED, code: USER_CODES.INVALID_CREDENTIALS, detail: USER_ERROR_DETAILS.INVALID_CREDENTIALS})
        }

        const isPasswordMatch = await comparePassword(password, user?.password)

        if (!isPasswordMatch) {
            throw createApiError({status:HTTP.UNAUTHORIZED, code:USER_CODES.INVALID_PASSWORD,detail: USER_ERROR_DETAILS.INVALID_PASSWORD,})
        }

        if(username && email){
            if(username !== user.username || email !== user.email){
                throw createApiError({detail: USER_ERROR_DETAILS.INCORRECT_CREDENTIALS, status:HTTP.UNAUTHORIZED, code: USER_CODES.INVALID_CREDENTIALS})
            }
        }

        const payload = {
            userId: user._id.toString(),
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        }

        const token = jwtSign(payload, '30d')
        await storeUserToken(user._id.toString(), token, '30d')

        return {user, token}
    }catch(e){
        logger.error('Error in userLoginService:', e)
        throw e;
    }
}
