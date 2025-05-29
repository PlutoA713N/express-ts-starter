import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../class/api.error.class';
import logger from "../../logger";
import {getTimestamp} from "../../utils/time";
import {getRequestId} from "../../context/requestContext";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {

    const contextRequestId = getRequestId()

    const requestId = contextRequestId ||
        (req.headers['x-request-id'] as string) ||
        (err instanceof ApiError && err.requestId)

    const time = getTimestamp()

    logger.error(`[Error Handler] ${err instanceof Error ? err.message : String(err)}`, err);

    if (err instanceof ApiError) {

        res.status(err.status).json({
            type: err.type,
            title: err.title,
            status: err.status,
            detail: err.detail || err.message,
            instance: err.instance || req.originalUrl,
            code: err.code,
            errors: err.errors || [],
            requestId,
            timestamp: err.timestamp,
        });

        return
    } else {
        logger.error('[Unhandled Error]', err);

        res.status(500).json({
            type: 'urn:error:INTERNAL_ERROR',
            title: 'Internal Server Error',
            status: 500,
            detail: 'An unexpected error occurred.',
            instance: req.originalUrl,
            code: 'INTERNAL_ERROR',
            requestId,
            timestamp: time,
        });
    }
}