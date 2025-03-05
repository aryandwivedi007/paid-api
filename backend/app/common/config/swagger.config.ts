
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { userDocs } from '../../docs/user.docs';
import { paymentDocs } from '../../docs/payment.docs';
import { apiModuleDocs } from '../../docs/api-module.docs';
import { apiUsageDocs } from '../../docs/api-usage.docs';

const swaggerOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation for your Node.js & TypeScript app',
    },
    servers: [ // ✅ Moved outside `paths`
      {
        url: 'http://localhost:5000/api', // Change this based on your server URL
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
    paths: { // ✅ Correct placement of `paths`
      ...userDocs,
      ...apiModuleDocs,
      ...paymentDocs,
      ...apiUsageDocs // ✅ Fix: Ensure correct name
    },
  },
  apis: ['./app/routes/*.ts'], // Path to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log('Swagger Docs available at http://localhost:5000/api-docs');
};
