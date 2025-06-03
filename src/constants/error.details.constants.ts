export const VALIDATION_ERROR_DETAILS = {
    EMAIL_EXISTS: "An account with this email address already exists.",
    USERNAME_EXISTS: "An account with this username already exists.",
    VALIDATION_FAILED: "Validation failed for the input body. Check the input and try again.",
    PROVIDE_EMAIL_OR_USERNAME: "Either email or username should be provided",
} as const


export const VALIDATION_MESSAGES = {
    USERNAME: {
        REQUIRED: "Username is required",
        TYPE: "Username must be a string",
        EMPTY: "Username cannot be empty",
        LENGTH: "Username must be between 3 and 20 characters",
    },
    EMAIL: {
        REQUIRED: "Email is required",
        TYPE: "Email must be a string",
        EMPTY: "Email cannot be empty",
        INVALID: "Invalid email address",
    },
    PASSWORD: {
        REQUIRED: "Password is required",
        TYPE: "Password must be a string",
        EMPTY: "Password cannot be empty",
        LENGTH: "Password must be at least 8 characters",
    },
} as const


export const USER_ERROR_DETAILS = {
    INVALID_PASSWORD: "Password is incorrect",
    INVALID_CREDENTIALS: "Invalid Credentials, Check your username or email",
    INCORRECT_CREDENTIALS: 'The credentials provided do not match our records.',
}

export const HTTP_ERROR_DETAILS = {
    TOO_MANY_REQUESTS: 'Too many requests, please try again later.',
    TOO_MANY_LOGIN_ATTEMPTS: 'You’ve exceeded the number of login attempts. Please wait before retrying.'
}

export const MONGO_ERROR_DETAILS = {
    MONGO_DATABASE_ERROR: "MongoDB connection failed",
}


export type ErrorDetails = typeof VALIDATION_ERROR_DETAILS[keyof typeof VALIDATION_ERROR_DETAILS]