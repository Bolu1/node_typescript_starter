import {Express, Request, Response} from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import {version} from '../../package.json'
const log = require('./logger')

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: 'Rest api docs',
            version
        },
        components:{
            securityShemas:{
                bearerAuth:{
                    type: 'http',
                    schema: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ]
    },
    apis: ["./src/routes/user/modules/auth.ts", './src/routes/*.ts']
}

const swaggerSpec = swaggerJsdoc(options)

const swaggerDocs = (app: Express, port: number) => {

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    app.get('docs.json', (req:Request, res:Response) =>{
        res.setHeader('Content-Type', "application/json")
        res.send(swaggerSpec)
    })

    log.info(`Docs available at http://localhost:${port}/docs`)
}

module.exports = swaggerDocs