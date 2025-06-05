import { sign, verify, SignOptions, TokenExpiredError, JsonWebTokenError} from "jsonwebtoken"
import {config} from "dotenv";
import {getEnv} from "../config/env";
import logger from "../logger";
import {createApiError} from "../factory/create.api.error";
import HTTP from "http-status-codes";
import {JWT} from "../constants/error.constants";
import {JWT_ERROR} from "../constants/error.details.constants";

config()
export interface IDecodedToken {
    userId: string,
    username: string,
    email: string,
    createdAt: string,
    iat: number,
    exp: number
}

const SECRET_KEY: string = getEnv('JWT_SECRET_KEY')

const jwtSign = (payload: object, expiryTime: string | number = '24h'): string => {
    try {
        const time = convertToSeconds(expiryTime)

        const options: SignOptions = {
            algorithm: 'HS256',
            expiresIn: time
        }

        return sign(payload, SECRET_KEY, options)
    } catch (error: any) {
        logger.error('JWT signing error:', error)
        throw createApiError({
            status: HTTP.INTERNAL_SERVER_ERROR,
            code: JWT.SIGNING_ERROR,
            detail: JWT_ERROR.SIGNING_ERROR + ': ' + (error instanceof Error ? error.message : String(error))
        });
    }
}


const verifyJwtToken = (token: string): IDecodedToken => {
    try {
        const decoded = verify(token, SECRET_KEY)
        return decoded as IDecodedToken
    } catch (error: any) {
        logger.error('JWT token verification error:', error)
        if (error instanceof TokenExpiredError) {
            throw createApiError({status: HTTP.UNAUTHORIZED, detail: 'Token expired', code: JWT.TOKEN_EXPIRED});
        } else if (error instanceof JsonWebTokenError) {
            throw createApiError({status: HTTP.UNAUTHORIZED, detail: 'Invalid token', code: JWT.INVALID_TOKEN});
        } else {
            throw createApiError({
                status: HTTP.UNAUTHORIZED,
                code: JWT.VERIFICATION_FAILED,
                detail: JWT_ERROR.VERIFICATION_FAILED + ': ' + (error instanceof Error ? error.message : String(error))
            });
        }
    }
}


export const convertToSeconds = (expiryTime: string | number): number => {
    if (typeof expiryTime === "number") {
        return expiryTime;
    }

    const match = expiryTime.match(/^(\d+)([smhd])$/);
    if (!match) {
        logger.error('Invalid expiry time format', expiryTime);
        throw createApiError({
            status: HTTP.BAD_REQUEST,
            code: JWT.INVALID_EXPIRY_UNIT,
            detail: JWT_ERROR.INVALID_EXPIRY_FORMAT,
        });    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
        case 's': return value;
        case 'm': return value * 60;
        case 'h': return value * 60 * 60;
        case 'd': return value * 60 * 60 * 24;
        default: throw createApiError({
            status: HTTP.BAD_REQUEST,
            code: JWT.INVALID_EXPIRY_UNIT,
            detail: JWT_ERROR.INVALID_EXPIRY_UNIT,
        });
    }
};


export { verifyJwtToken, jwtSign }