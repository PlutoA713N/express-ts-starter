import {Request, Response, NextFunction} from "express";
import {pingDB} from "../../config/mongodb.connection";
import logger from "../../logger";
import {createSuccessResponse} from "../../factory/create.sucess.response";
import {createApiError} from "../../factory/create.api.error";

export async function mongoHealthcheck(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await pingDB();
        logger.info("MongoDB ping successful");

         res.status(200).json(
            createSuccessResponse({
                code: "MONGO_OK",
                message: "MongoDB connected",
                data: { mongo: "connected" }
            })
        );
         return
    } catch (err) {
        logger.error("MongoDB health check failed", err);

        const errorResponse = createApiError({
            status: 500,
            code: "DB_PING_ERROR",
            title: "Database Error",
            detail: err instanceof Error ? err.message : "Unknown error"
        });

        next(errorResponse);
    }
}