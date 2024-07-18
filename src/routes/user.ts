import { Router } from 'express'
import userController from '../controllers/userController'
import { check } from 'express-validator'

const registerValidator = [
    check('username').notEmpty().withMessage('This field cannot be empty'),
    check('email').notEmpty().withMessage('This field cannot be empty').isEmail(),
    check('password').notEmpty().withMessage('This field cannot be empty'),
]

const loginrValidator = [
    check('email').notEmpty().withMessage('This field cannot be empty').isEmail(),
    check('password').notEmpty().withMessage('This field cannot be empty'),
]


const router = Router()
/**
 * @openapi
 * /api/v1/users/register:
 *  post:
 *    tags:
 *      - User
 *    summary: Register a user
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - email
 *             - password
 *           properties:
 *             username:
 *               type: string
 *               default: tonystark 
 *             email:
 *               type: string
 *               default: tonystark@mail.com
 *             password:
 *               type: string
 *               default: tonystark123!.
 *    responses:
 *      200:
 *        description: Successfully created user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      example: 66918c810539f5b1b08dd485
 *                    username:
 *                      type: string
 *                      example: tonystark
 *                    email:
 *                      type: string
 *                      example: tonystark@mail.com
 *                    token:
 *                      type: string
 *                      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkxOGM4MTA1MzlmNWIxYjA4ZGQ0ODUiLCJpYXQiOjE3MjA4MTQ3MjEsImV4cCI6MTcyMTQxOTUyMX0.H5-D005XfVoCbciqJWw2qpGX9VMgd-lBEfVjNFY4F9s"
 *                message:
 *                  type: string
 *                  example: Application is alive!
 *                error:
 *                  type: boolean
 *                  example: false
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    code:
 *                      type: number
 *                      example: 0
 *                    reason:
 *                      type: string
 *                      example: User with the given email already exist
 *                    additional:
 *                      type: array
 *                      example: null
 *                message:
 *                  type: string
 *                  example: Bad request
 *                error:
 *                  type: boolean
 *                  example: true
 *      500:
 *        description: Server Error
 */
router.post('/register', registerValidator, userController.register)

/**
 * @openapi
 * /api/v1/users/login:
 *  post:
 *    tags:
 *      - User
 *    summary: Login a user
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               default: tonystark@mail.com
 *             password:
 *               type: string
 *               default: tony123!.
 *    responses:
 *      200:
 *        description: Successfully login
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      example: 66918c810539f5b1b08dd485
 *                    username:
 *                      type: string
 *                      example: tonystark
 *                    email:
 *                      type: string
 *                      example: tonystark@mail.com
 *                    token:
 *                      type: string
 *                      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkxOGM4MTA1MzlmNWIxYjA4ZGQ0ODUiLCJpYXQiOjE3MjA4MTQ3MjEsImV4cCI6MTcyMTQxOTUyMX0.H5-D005XfVoCbciqJWw2qpGX9VMgd-lBEfVjNFY4F9s"
 *                message:
 *                  type: string
 *                error:
 *                  type: boolean
 *                  example: false
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    code:
 *                      type: number
 *                      example: 0
 *                    reason:
 *                      type: string
 *                      example: Invalid request body
 *                    additional:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          type:
 *                            type: string
 *                          msg:
 *                            type: string
 *                          path:
 *                            type: string
 *                          location:
 *                            type: string
 *                      example:
 *                        - type: field
 *                          msg: This field cannot be empty
 *                          path: password
 *                          location: body
 *                message:
 *                  type: string
 *                  example: Bad request
 *                error:
 *                  type: boolean
 *                  example: true
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    code:
 *                      type: number
 *                      example: 0
 *                    reason:
 *                      type: string
 *                      example: Invalid email or password
 *                    additional:
 *                      type: array
 *                      example: null
 *                message:
 *                  type: string
 *                  example: Bad request
 *                error:
 *                  type: boolean
 *                  example: true
 *      500:
 *        description: Server Error
 */
router.post('/login', loginrValidator, userController.login)

export default router