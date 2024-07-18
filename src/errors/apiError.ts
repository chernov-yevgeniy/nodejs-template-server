class ApiError extends Error {
    status: number
    reason: string
    additional: string


    constructor(status: number, message: string, reason: string, additional?: any) {
        super(message)
        this.status = status
        this.reason = reason
        this.additional = additional
    }

    static badRequest(reason: string, additional?: any) {
        return new ApiError(400, 'Bad request', reason, additional)
    }

    static unauthorized(reason: string) {
        return new ApiError(401, 'Unauthorized', reason)
    }

    static paymentFailed(reason: string) {
        return new ApiError(402, 'Payment failed', reason)
    }

    static forbidden(reason: string) {
        return new ApiError(403, 'Forbidden', reason)
    }

    static notfound(reason: string) {
        return new ApiError(404, 'Not found', reason)
    }

    static conflict(reason: string) {
        return new ApiError(409, 'Conflict', reason)
    }

    static internal(error: any) {
        const reason = error instanceof Error ? error.message : error;
        return new ApiError(500, 'Internal server error', reason)
    }
}

export default ApiError