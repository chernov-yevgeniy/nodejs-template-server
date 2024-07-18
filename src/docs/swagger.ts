import { Application, Request, Response } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Chat server',
      description: "API endpoints and socket server for a chat service documented on swagger",
      contact: {
        name: "Chernov Yevgeniy",
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server"
      }
    ]
  },
  // looks for configuration in specified directories
  apis: ['src/routes/*.js'],
}
const swaggerSpec = swaggerJsdoc(options)
function swaggerDocs(app: Application) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  // Documentation in JSON format
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}
export default swaggerDocs