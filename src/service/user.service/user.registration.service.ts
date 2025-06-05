import {Request} from "express";
import {generateHash} from "../../utils/auth";
import {UserModel} from "../../models/user/user.model";
import {storeUserToken} from "../../config/redis/redis.utils";
import {jwtSign} from "../../utils/jwt";
import {checkFieldExists} from "../../models/mongo_operations/mongo_utils";
import {createApiError} from "../../factory/create.api.error";
import HTTP from "http-status-codes";
import { VALIDATION_ERROR_CODES} from "../../constants/error.constants";
import logger from "../../logger";
import {VALIDATION_ERROR_DETAILS} from "../../constants/error.details.constants";

export async function registerUserService(username: string, email: string, password: string) {
    try{
        const hashedPassword = await generateHash(password);

        const userData = new UserModel({
            username,
            email,
            password: hashedPassword,
        });

        const usernameInDB = await checkFieldExists(UserModel,"username", username);

        if (usernameInDB.isExists) {
            const error = createApiError({status: HTTP.CONFLICT, code: VALIDATION_ERROR_CODES.USERNAME_EXISTS, detail: VALIDATION_ERROR_DETAILS.EMAIL_EXISTS})
            throw error;
        }

        const emailInDB = await checkFieldExists(UserModel,"email", email);

        if (emailInDB.isExists) {
            const error = createApiError({status: HTTP.CONFLICT, code:VALIDATION_ERROR_CODES.EMAIL_EXISTS, detail: VALIDATION_ERROR_DETAILS.USERNAME_EXISTS});
            throw error;
        }

        const newUser = await userData.save();

        const payload = {
            userId: userData._id.toString(),
            username: userData.username,
            email: userData.email,
        };

        const jwtToken =  jwtSign(payload);
        await  storeUserToken(userData._id.toString(), jwtToken)

        return {user: newUser, token: jwtToken};

    }catch(e){
        logger.error('Error in registerUserService:', e)
        throw e;
    }
}