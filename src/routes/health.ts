import { Router } from 'express'
import healthController from '../controllers/healthController'

const router = Router()

/**
 * @openapi
 * /api/v1/health/check-app:
 *  get:
 *     tags:
 *       - Health
 *     summary: Get server status
 *     responses:
 *       200:
 *          description: Status successfully
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      data:
 *                         type: object
 *                         properties:
 *                            dateTime:
 *                               type: string
 *                               example: 2024-07-12T16:24:21.865Z
 *                      message:
 *                         type: string
 *                         example: Application is alive!
 *                      error:
 *                         type: boolean
 *                         example: false
 *       500:
 *         description: Server Error
 */
router.get('/check-app', healthController.checkApp)

export default router