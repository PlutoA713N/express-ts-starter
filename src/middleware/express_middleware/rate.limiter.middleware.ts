import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import {createApiError} from '../../factory/create.api.error';
import logger from "../../logger";
import {ERROR_CODES} from "../../constants/error.constants";
import HTTP from "http-status-codes";
import {HTTP_ERROR_DETAILS} from "../../constants/error.details.constants";
import {getEnv} from "../../config/env";

const API_RATE_LIMIT_WINDOW_MINUTES = Number(getEnv('API_RATE_LIMIT_WINDOW_MINUTES', false, '15'))
const API_RATE_LIMIT_REQUESTS = Number(getEnv('API_RATE_LIMIT_REQUESTS', false, '50'))
const LOGIN_RATE_LIMIT_WINDOW_MINUTES = Number(getEnv('LOGIN_RATE_LIMIT_WINDOW_MINUTES', false, '10'));
const LOGIN_RATE_LIMIT_REQUESTS = Number(getEnv('LOGIN_RATE_LIMIT_REQUESTS', false, '5'))

function createRateLimitHandler(code: string, detail: string, logPrefix: string )  {
    return (req: Request, res: Response) => {
        const error = createApiError({
            status: HTTP.TOO_MANY_REQUESTS,
            code: code,
            detail: detail,
            instance: req.originalUrl,
        });

        logger.warn(`[${logPrefix}] ${req.ip} exceeded limit on ${req.originalUrl}`, {
            ip: req.ip,
            path: req.originalUrl,
            requestId: req.headers['x-request-id'] as string,
            userAgent: req.headers['user-agent'],
        });

        res.status(error.status).json(error);
    }
}

export const apiLimiter = rateLimit({
    windowMs: API_RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
    limit: API_RATE_LIMIT_REQUESTS,
    standardHeaders: true,
    legacyHeaders: false,
    handler: createRateLimitHandler(ERROR_CODES.TOO_MANY_REQUESTS,HTTP_ERROR_DETAILS.TOO_MANY_REQUESTS,'RateLimit')
});


export const loginRateLimiter = rateLimit({
    windowMs: LOGIN_RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
    limit: LOGIN_RATE_LIMIT_REQUESTS,
    standardHeaders: true,
    legacyHeaders: false,
    handler: createRateLimitHandler(ERROR_CODES.TOO_MANY_LOGIN_ATTEMPTS, HTTP_ERROR_DETAILS.TOO_MANY_LOGIN_ATTEMPTS, 'LoginRateLimit')
});