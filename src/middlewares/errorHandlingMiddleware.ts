import { Request, Response, NextFunction } from "express";
import ApiError from "../errors/apiError";
import { printError } from "../providers/logger";
import { error } from "../responses/responseFactory";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    printError(err);
    
    if (err instanceof ApiError) {
        const data = {
            reason: err.reason,
            additional: err.additional,
        };
        const message = err.message;
        return res.status(err.status).json(error(data, message));
    }

    return res.status(500).json({ message: 'Internal server error.' });
}
