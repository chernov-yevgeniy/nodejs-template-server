import dotenv from 'dotenv'
dotenv.config()

import mongoConnection from './database/mongodb'

import { printInfo, printError } from './providers/logger'

export async function boot() {
    await mongoConnection()
        .then(() => printInfo('Success connect to mongodb'))
        .catch((e) => printError('Mongodb connection error. ' + e.message))
}