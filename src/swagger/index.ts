import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from './swagger.config';
import { Express } from 'express';

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const setupSwaggerDocs = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get('/api-docs.json', (_, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
};