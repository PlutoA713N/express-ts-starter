import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { createApiError } from '../../factory/create.api.error';
import logger from "../../logger";
import {ERROR_CODES} from "../../constants/error.constants";
import HTTP from "http-status-codes";
import {HTTP_ERROR_DETAILS} from "../../constants/error.details.constants";

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 50,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request, res: Response) => {

        const error = createApiError({
            status: HTTP.TOO_MANY_REQUESTS,
            code: ERROR_CODES.TOO_MANY_REQUESTS,
            detail: HTTP_ERROR_DETAILS.TOO_MANY_REQUESTS,
            instance: req.originalUrl,
        });

        logger.warn(`[RateLimit] ${req.ip} exceeded limit on ${req.originalUrl}`, {
            ip: req.ip,
            path: req.originalUrl,
            requestId: req.headers['x-request-id'] as string,
            userAgent: req.headers['user-agent'],
        });

        res.status(error.status).json(error);
    },
});


export const loginRateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 3,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request, res: Response) => {

        const error = createApiError({
            status: HTTP.TOO_MANY_REQUESTS,
            code: ERROR_CODES.TOO_MANY_LOGIN_ATTEMPTS,
            detail: HTTP_ERROR_DETAILS.TOO_MANY_LOGIN_ATTEMPTS,
            instance: req.originalUrl,
        });

        logger.warn(`[LoginRateLimit] ${req.ip} blocked from logging in`, {
            ip: req.ip,
            path: req.originalUrl,
            requestId: req.headers['x-request-id'] as string,
            userAgent: req.headers['user-agent'],
        });

        res.status(error.status).json(error);
    },
});
