import {Request, Response, NextFunction} from "express";
import {pingDB} from "../../config/mongodb/mongodb.connection";
import logger from "../../logger";
import {createSuccessResponse} from "../../factory/create.sucess.response";
import {createApiError} from "../../factory/create.api.error";
import {MONGO_EVENTS, MONGO_MESSAGES} from "../../constants/success.constants";
import HTTP from "http-status-codes";
import {MONGO_ERROR_CODES} from "../../constants/error.constants";
import {MONGO_ERROR_DETAILS} from "../../constants/error.details.constants";

export async function mongoHealthcheck(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await pingDB();
        logger.info("MongoDB ping successful");

         res.status(HTTP.OK).json(
            createSuccessResponse({
                code: MONGO_EVENTS.MONGO_OK,
                message: MONGO_MESSAGES.MONGO_CONNECTION_SUCCESS,
                data: { mongo: "connected" }
            })
        );
         return
    } catch (err) {
        logger.error("MongoDB health check failed", err);

        const errorResponse = createApiError({
            status: HTTP.INTERNAL_SERVER_ERROR,
            code: MONGO_ERROR_CODES.DB_PING_ERROR,
            title: MONGO_ERROR_DETAILS.MONGO_DATABASE_ERROR,
            detail: err instanceof Error ? err.message : "Unknown error"
        });

        next(errorResponse);
    }
}

