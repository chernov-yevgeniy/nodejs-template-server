import { Application, Router } from 'express'
import healthRoute from './health'
import userRoute from './user'

export default function (app: Application) {
    const router = Router()

    router.use('/health', healthRoute)
    router.use('/users', userRoute)

    app.use('/api/v1', router)
}