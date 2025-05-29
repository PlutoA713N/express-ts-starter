// src/tests/mongoHealthcheck.test.ts
import { Request, Response, NextFunction } from 'express';
import { mongoHealthcheck } from '../../models/mongo_operations/index';
import * as mongodb from '../../config/mongodb.connection';
import logger from '../../logger';
import { createSuccessResponse } from '../../factory/create.sucess.response';
import { createApiError } from '../../factory/create.api.error';

jest.mock('../../config/mongodb.connection');
jest.mock('../../logger');
jest.mock('../../factory/create.sucess.response');
jest.mock('../../factory/create.api.error');

describe('mongoHealthcheck', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = { originalUrl: '/health/mongodb' };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();

        jest.clearAllMocks();
    });

    it('should respond with 200 and success message when pingDB succeeds', async () => {
        (mongodb.pingDB as jest.Mock).mockResolvedValue(undefined);
        (createSuccessResponse as jest.Mock).mockImplementation((obj) => obj);

        await mongoHealthcheck(req as Request, res as Response, next);

        expect(mongodb.pingDB).toHaveBeenCalled();
        expect(logger.info).toHaveBeenCalledWith('MongoDB ping successful');
        expect(createSuccessResponse).toHaveBeenCalledWith({
            code: 'MONGO_OK',
            message: 'MongoDB connected',
            data: { mongo: 'connected' },
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            code: 'MONGO_OK',
            message: 'MongoDB connected',
            data: { mongo: 'connected' },
        }));
        expect(next).not.toHaveBeenCalled();
    });

    it('should call next with error when pingDB fails with Error instance', async () => {
        const error = new Error('Ping failed');
        (mongodb.pingDB as jest.Mock).mockRejectedValue(error);
        (createApiError as jest.Mock).mockImplementation((params) => params);

        await mongoHealthcheck(req as Request, res as Response, next);

        expect(mongodb.pingDB).toHaveBeenCalled();
        expect(logger.error).toHaveBeenCalledWith('MongoDB health check failed', error);
        expect(createApiError).toHaveBeenCalledWith({
            status: 500,
            code: 'DB_PING_ERROR',
            title: 'Database Error',
            detail: 'Ping failed',
        });
        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            status: 500,
            code: 'DB_PING_ERROR',
            title: 'Database Error',
            detail: 'Ping failed',
        }));
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it('should call next with error when pingDB fails with non-Error', async () => {
        (mongodb.pingDB as jest.Mock).mockRejectedValue("some string error");
        (createApiError as jest.Mock).mockImplementation((params) => params);

        await mongoHealthcheck(req as Request, res as Response, next);

        expect(mongodb.pingDB).toHaveBeenCalled();
        expect(logger.error).toHaveBeenCalledWith('MongoDB health check failed', "some string error");
        expect(createApiError).toHaveBeenCalledWith({
            status: 500,
            code: 'DB_PING_ERROR',
            title: 'Database Error',
            detail: 'Unknown error',
        });
        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            status: 500,
            code: 'DB_PING_ERROR',
            title: 'Database Error',
            detail: 'Unknown error',
        }));
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

});
