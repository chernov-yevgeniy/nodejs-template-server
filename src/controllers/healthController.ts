import { Request, Response } from "express"
import { success } from '../responses/responseFactory'
import { getDate } from "../utils/date.util"

class HealthController {
    async checkApp(req: Request, res: Response) {
        return res.json(success({ dateTime: getDate() }))
    }
}

export default new HealthController