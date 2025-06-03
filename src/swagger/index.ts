import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from './swagger.config';
import YAML from "yamljs"
import path from "node:path";
import { Express } from 'express';

// const swaggerSpec = swaggerJSDoc(swaggerOptions);
// const swaggerSpec = YAML.parse(JSON.stringify(swaggerOptions));
const swaggerSpec = YAML.load(path.resolve(__dirname, 'openapi.yaml'))


export const setupSwaggerDocs = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get('/api-docs.json', (_, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
};