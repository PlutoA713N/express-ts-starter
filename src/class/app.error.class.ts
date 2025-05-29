export class AppError extends Error {
    statusCode: number;
    code: string;
    errors?: any[];

    constructor(message: string, statusCode: number, code: string, errors?: any[]) {
        super(message)
        this.statusCode = statusCode,
            this.code = code,
            this.name = this.constructor.name,
            this.errors = errors
        Error.captureStackTrace(this, this.constructor)

    }
}