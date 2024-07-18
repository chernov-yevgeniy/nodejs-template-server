import os from 'os'
import { format, createLogger, transports } from 'winston'
import { getDate } from '../utils/date.util'

const alignedWithColorsAndTime = format.combine(
    format.printf((info) => {
        const {
            ...args
        } = info
        return `${Object.keys(args).length ? JSON.stringify(args) : ''}`
    }),
)

// define the custom settings for each transport (file, console)
const options = {
    console: {
        handleExceptions: true,
        json: true,
        colorize: false,
        format: alignedWithColorsAndTime
    },
}

const logger = createLogger({
    transports: [ new transports.Console(options.console) ],
    exitOnError: false,
})

export function printInfo(message: string, additionalInfo = null): void {
    logger.info({message, date: getDate(), server: os.hostname, additionalInfo})
}

export function printError(message: string, additionalInfo = null): void {
    logger.error({message, date: getDate(), server: os.hostname, additionalInfo})
}
