import { Request, Response, NextFunction } from "express";
import {createApiError} from "../../factory/create.api.error";
import { IDecodedToken, verifyJwtToken } from "./../../utils/jwt"
import {getUserToken} from "../../config/redis/redis.utils";
import HTTP from "http-status-codes";
import {AUTH} from "../../constants/error.constants";
import {AUTH_ERROR} from "../../constants/error.details.constants";
import {validateAndAttach} from "../../models/mongo_operations/mongo_utils";
import {UserModel} from "../../models/user/user.model";
import {ICustomRequest} from "../../interfaces/Request_interfaces";

export const authenticationHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(createApiError({detail: AUTH_ERROR.MISSING_OR_INVALID_TOKEN, status: HTTP.BAD_REQUEST, code: AUTH.INVALID_AUTH_TOKEN}));
        }

        const token = authHeader?.split(' ')[1]

        if (!token) {
            return next(createApiError({detail: AUTH_ERROR.TOKEN_NOT_PROVIDED, status: HTTP.BAD_REQUEST, code: AUTH.INVALID_AUTH_TOKEN}));

        }

        const { userId } = verifyJwtToken(token) as IDecodedToken
        const storedTokenValue = await getUserToken(userId)

        if (!storedTokenValue) {
            return next(createApiError({detail: AUTH_ERROR.TOKEN_NOT_FOUND, status: HTTP.BAD_REQUEST, code:AUTH.EXPIRED_AUTH_TOKEN}));
        }

        if (storedTokenValue !== token) {
            return next(createApiError({detail: AUTH_ERROR.TOKEN_MISMATCH, status: HTTP.BAD_REQUEST, code:AUTH.EXPIRED_AUTH_TOKEN}));
        }

        await validateAndAttach(UserModel, userId, 'user', req as ICustomRequest)

        return next()

    } catch (error) {
        return next(error)
    }
}
