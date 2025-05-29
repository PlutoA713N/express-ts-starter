export const responses = {
    NotFound: {
        description: 'Resource not found',
        content: {
            'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
            },
        },
    },
    InternalServerError: {
        description: 'Unexpected server error',
        content: {
            'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
            },
        },
    },
    TooManyRequests: {
        description: 'Client has sent too many requests in a given amount of time.',
        content: {
            'application/json': {
                schema: { $ref: '#/components/schemas/TooManyRequestsError' },
            },
        },
    },

};