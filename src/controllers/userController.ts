import { validationResult } from 'express-validator'
import User from '../models/user'
import ApiError from '../errors/apiError'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { success } from '../responses/responseFactory'


class RegisterController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, email, password } = req.body

            const errors = validationResult(req)
            if (!errors.isEmpty())
                return next(ApiError.badRequest('Invalid request body', errors.array()))

            const jwtSecretKey = process.env.JWT_SECRET_KEY;

            if (!jwtSecretKey)
                return next(ApiError.internal('JWT_SECRET_KEY is not defined'))

            let user = await User.findOne({ email })

            if (user)
                return next(ApiError.badRequest('User with the given email already exist'))

            user = new User({ username, email, password })

            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt)

            await user.save()

            const token = jwt.sign({ _id: user._id }, jwtSecretKey, { expiresIn: "7d" })

            return res.json(success({ _id: user._id, username, email, token }, 'User successfully registered'))
        } catch (e) {
            return next(ApiError.internal(e))
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body

            const errors = validationResult(req)
            if (!errors.isEmpty())
                return next(ApiError.badRequest('Invalid request body', errors.array()))

            const jwtSecretKey = process.env.JWT_SECRET_KEY;

            if (!jwtSecretKey)
                return next(ApiError.internal('JWT_SECRET_KEY is not defined'))

            let user = await User.findOne({ email })

            if (!user) 
                return next(ApiError.unauthorized('User with this email not registered'))

            const isValidPassword = await bcrypt.compare(password, user.password)

            if (!isValidPassword) 
                return next(ApiError.unauthorized('Invalid email or password'))

            const token = jwt.sign({ _id: user._id }, jwtSecretKey, { expiresIn: "7d" })

            return res.json(success({ _id: user._id, username: user.username, email, token }))
        } catch (e) {
            return next(ApiError.internal(e))
        }
    }
}

export default new RegisterController