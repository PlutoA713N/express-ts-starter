import { ValidationChain, body, validationResult, ValidationError} from "express-validator";
import HTTP from "http-status-codes"
import logger from "../../logger";
import {Request, Response, NextFunction} from "express";
import {createApiError} from "../../factory/create.api.error";
import {ERROR_CODES, VALIDATION_ERROR_CODES} from "../../constants/error.constants";
import {FieldError} from "../../interfaces/validation_interfaces";
import {VALIDATION_ERROR_DETAILS, VALIDATION_MESSAGES} from "../../constants/error.details.constants";
import {emailValidator, passwordValidator, usernameValidator} from "./field.validators";


export const validateRegistrationRules: ValidationChain[] = [
    usernameValidator.required(),
    emailValidator.required(),
    passwordValidator.required(true),
];


export const validateLoginRules: ValidationChain[] = [
    usernameValidator.optional(),
    emailValidator.optional(),
    body('username_or_email').custom((value, { req }) => {
        const { email, username } = req.body
        if (!email && !username) {
            throw new Error(VALIDATION_ERROR_DETAILS.PROVIDE_EMAIL_OR_USERNAME);
        }
        return true
    }),
    passwordValidator.required(false),
];

export const validateResult = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error: FieldError[] = errors.array().map((e) => ({
                field: (e as any).param,
                message: (e as any).msg,
                value: (e as any).value,
                location: (e as any).location
            }))
            return next(createApiError({code: VALIDATION_ERROR_CODES.VALIDATION_FAILED, detail: VALIDATION_ERROR_DETAILS.VALIDATION_FAILED,status: HTTP.BAD_REQUEST, instance: req.originalUrl, errors: error}));
        } else {
            next()
        }
    } catch (error: any) {
        logger.error("Error in validation middleware: error: ", error, "stack: ", error.stack, "message: ", error.message, "")
        next(createApiError({code: ERROR_CODES.INTERNAL_SERVER_ERROR, status: HTTP.INTERNAL_SERVER_ERROR}));
    }
};
