import swaggerUi from 'swagger-ui-express';
import YAML from "yamljs"
import path from "node:path";
import { Express } from 'express';

const swaggerSpec = YAML.load(path.resolve(__dirname, 'openapi.yaml'))


export const setupSwaggerDocs = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get('/api-docs.json', (_, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
};