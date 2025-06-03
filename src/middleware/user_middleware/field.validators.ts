import { body } from "express-validator";
import {VALIDATION_MESSAGES} from "../../constants/error.details.constants";

export const emailValidator = {
    required: () =>
        body("email")
            .exists().withMessage(VALIDATION_MESSAGES.EMAIL.REQUIRED)
            .bail()
            .isString().withMessage(VALIDATION_MESSAGES.EMAIL.TYPE)
            .bail()
            .notEmpty().withMessage(VALIDATION_MESSAGES.EMAIL.EMPTY)
            .bail()
            .isEmail().withMessage(VALIDATION_MESSAGES.EMAIL.INVALID)
            .normalizeEmail(),

    optional: () =>
        body("email")
            .optional()
            .isString().withMessage(VALIDATION_MESSAGES.EMAIL.TYPE)
            .bail()
            .isEmail().withMessage(VALIDATION_MESSAGES.EMAIL.INVALID)
            .normalizeEmail()
};

export const usernameValidator = {
    required: () =>
        body("username")
            .exists().withMessage(VALIDATION_MESSAGES.USERNAME.REQUIRED)
            .bail()
            .isString().withMessage(VALIDATION_MESSAGES.USERNAME.TYPE)
            .bail()
            .notEmpty().withMessage(VALIDATION_MESSAGES.USERNAME.EMPTY)
            .bail()
            .trim()
            .isLength({ min: 3, max: 20 }).withMessage(VALIDATION_MESSAGES.USERNAME.LENGTH)
            .escape(),

    optional: () =>
        body("username")
            .optional()
            .isString().withMessage(VALIDATION_MESSAGES.USERNAME.TYPE)
            .bail()
            .trim()
            .isLength({ min: 3, max: 20 }).withMessage(VALIDATION_MESSAGES.USERNAME.LENGTH)
            .escape()
};

export const passwordValidator = {
    required: (enforceMinLength = false) => {
        let validator = body("password")
            .exists().withMessage(VALIDATION_MESSAGES.PASSWORD.REQUIRED)
            .bail()
            .isString().withMessage(VALIDATION_MESSAGES.PASSWORD.TYPE)
            .bail()
            .notEmpty().withMessage(VALIDATION_MESSAGES.PASSWORD.EMPTY);

        if (enforceMinLength) {
            validator = validator
                .bail()
                .isLength({ min: 8 }).withMessage(VALIDATION_MESSAGES.PASSWORD.LENGTH);
        }

        return validator;
    }
};