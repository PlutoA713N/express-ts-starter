import { Request, Response, NextFunction } from "express";
import {requestContext} from "../../context/requestContext";
import { v4 as uuidv4 } from "uuid";

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
    const incomingRequestId = req.headers['x-request-id'] as string
    const requestId = incomingRequestId?.trim() || uuidv4() as string

    requestContext.run({requestId}, () => {
        res.setHeader('x-request-id', requestId)
        next()
    })
}
