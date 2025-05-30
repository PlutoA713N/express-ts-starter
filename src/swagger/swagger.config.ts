import { schemas } from './components/schemas';
import { responses } from './components/responses';
import { securitySchemes } from './components/security';

export const swaggerDefinition = {
    openapi: '3.0.3',
    info: {
        title: 'Your API',
        version: '1.0.0',
        description: 'API documentation with standard success and error responses',
    },
    servers: [
        {
            url: 'http://localhost:5000/',
            description: 'Development server',
        },
    ],
    components: {
        schemas,
        responses,
        securitySchemes,
    },
    security: [{ BearerAuth: [] }], // Global security
};

export const swaggerOptions = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // <-- Adjust to your project
};
