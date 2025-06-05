import { ApiError } from '../class/api.error.class';
import {getReasonPhrase} from 'http-status-codes'
import {getRequestId} from "../context/requestContext";
import {getTimestamp} from "../utils/time";

export interface ICreateApiErrorParams {
    status: number;
    code: string;
    title?: string;
    detail?: string;
    instance?: string;
    errors?: any[];
    type?: string;
    isOperational?: boolean;
    timestamp?: string;
}

export function createApiError({
                                   status,
                                   code,
                                   title,
                                   detail,
                                   instance,
                                   errors,
                                   type,
                                   isOperational,
                               }: ICreateApiErrorParams): ApiError {
    const requestId = getRequestId()
    const time = getTimestamp()
    return new ApiError({
        status,
        code,
        title : title || getReasonPhrase(status),
        detail,
        instance,
        errors,
        type: type || `urn:error:${code}`,
        isOperational: isOperational ?? true,
        requestId: requestId,
        timestamp: time,
    });
}
