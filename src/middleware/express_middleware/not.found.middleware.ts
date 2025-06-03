import {Request, Response, NextFunction} from "express";
import {createApiError} from "../../factory/create.api.error";
import HTTP from "http-status-codes";
import {ERROR_CODES} from "../../constants/error.constants";

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
        const error = createApiError({
            status: HTTP.NOT_FOUND,
            code: ERROR_CODES.NOT_FOUND,
            title: 'Not Found',
            detail: `The requested resource ${req.originalUrl} was not found.`,
            instance: req.originalUrl,
        })
       next(error)
}