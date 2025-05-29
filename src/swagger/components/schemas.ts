export const schemas = {
    SuccessResponse: {
        type: 'object',
        properties: {
            status: { type: 'integer', example: 200 },
            result: { type: 'string', example: 'success' },
            code: { type: 'string', example: 'USER_RETRIEVED' },
            message: { type: 'string', example: 'User retrieved successfully.' },
            data: { type: 'object' },
            meta: { type: 'object', nullable: true },
            requestId: { type: 'string', example: 'a1b2c3d4-e5f6-7890' },
            timestamp: { type: 'string', example: '2021-01-01T00:00:00.000Z' },
        },
    },
    ApiError: {
        type: 'object',
        properties: {
            type: { type: 'string', example: 'urn:error:USER_NOT_FOUND' },
            title: { type: 'string', example: 'User Not Found' },
            status: { type: 'integer', example: 404 },
            detail: { type: 'string', example: 'No user with ID 123 found.' },
            instance: { type: 'string', example: '/api/v1/users/123' },
            code: { type: 'string', example: 'USER_NOT_FOUND' },
            errors: {
                type: 'array',
                items: { type: 'object' },
            },
            requestId: { type: 'string', example: 'a1b2c3d4-e5f6-7890' },
            timestamp: { type: 'string', example: '2021-01-01T00:00:00.000Z' },
        },
    },
    TooManyRequestsError: {
        type: 'object',
        properties: {
            type: { type: 'string', example: 'urn:error:TOO_MANY_REQUESTS' },
            title: { type: 'string', example: 'Too Many Requests' },
            status: { type: 'integer', example: 429 },
            detail: {
                type: 'string',
                example: 'You have sent too many requests. Please try again later.',
            },
            instance: { type: 'string', example: '/api/v1/comments' },
            code: { type: 'string', example: 'TOO_MANY_REQUESTS' },
            errors: {
                type: 'array',
                items: { type: 'object' },
            },
            requestId: {
                type: 'string',
                example: 'a1b2c3d4-e5f6-7890',
            },
            timestamp: { type: 'string', example: '2021-01-01T00:00:00.000Z' },
        },
    }
};
