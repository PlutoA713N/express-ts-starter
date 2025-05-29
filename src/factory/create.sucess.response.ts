import {getRequestId} from "../context/requestContext";
import {getTimestamp} from "../utils/time";

interface CreateSuccessResponseParams<T = any> {
    status?: number;
    code?: string;
    message?: string;
    data?: T;
    meta?: Record<string, any>;
    result?: 'success';
}

export function createSuccessResponse<T>({
                                             status = 200,
                                             code,
                                             message,
                                             data,
                                             meta,
                                             result = 'success',
                                         }: CreateSuccessResponseParams<T>) {
    const requestId = getRequestId()
    const time = getTimestamp()
    return {
        status,
        result,
        ...(code && { code }),
        ...(message && { message }),
        ...(data !== undefined && { data }),
        ...(meta && { meta }),
        ...(requestId && { requestId: requestId }),
        timestamp: time,
    };
}
