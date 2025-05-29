import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createApiError } from '../../factory/create.api.error';
import logger from "../../logger";

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 50,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request, res: Response) => {

        const error = createApiError({
            status: 429,
            code: 'TOO_MANY_REQUESTS',
            title: 'Too Many Requests',
            detail: 'Too many requests, please try again later.',
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
    windowMs: 10 * 60 * 1000, // 10 minutes
    limit: 3,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request, res: Response) => {

        const error = createApiError({
            status: 429,
            code: 'TOO_MANY_LOGIN_ATTEMPTS',
            title: 'Too Many Login Attempts',
            detail: 'You’ve exceeded the number of login attempts. Please wait before retrying.',
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
