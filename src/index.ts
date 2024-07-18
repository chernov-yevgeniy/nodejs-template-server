import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from "./routes/index"
import errorHandlingMiddleware from './middlewares/errorHandlingMiddleware'
import swaggerDocs from './docs/swagger'
import { boot } from './bootstrap'
import { printInfo } from './providers/logger'

const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

routes(app)

swaggerDocs(app)

app.use(errorHandlingMiddleware)

const port = process.env.NODE_PORT || 3000

if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'production') {
  boot()
    .then(() => {
      app.listen(port, function () {
        printInfo(`Server listening on port: ${port}`)
      })
    })
}

export default app
