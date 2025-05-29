import {AsyncLocalStorage} from "node:async_hooks";

interface IRequestContext {
    requestId: string;
};

export const requestContext = new AsyncLocalStorage<IRequestContext>();

export const getRequestId = (): string | undefined => {
    return requestContext.getStore()?.requestId;
}

