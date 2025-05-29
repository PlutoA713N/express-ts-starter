import {Request, Response, NextFunction} from "express";
import {createApiError} from "../../factory/create.api.error";

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
        const error = createApiError({
            status: 404,
            code: 'NOT_FOUND',
            title: 'Not Found',
            detail: `The requested resource ${req.originalUrl} was not found.`,
            instance: req.originalUrl,
        })
       next(error)
}