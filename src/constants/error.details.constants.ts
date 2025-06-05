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


export const POST_VALIDATION_MESSAGES = {
    TITLE: {
        REQUIRED: "Title is required",
        TYPE: "Title must be a string",
        EMPTY: "Title cannot be empty",
        LENGTH: "Title length should be minimum 3 characters long",
    },
    CONTENT: {
        REQUIRED: "Content is required",
        TYPE: "Content must be a string",
        EMPTY: "Content cannot be empty",
        LENGTH: "Content length should be minimum 2 characters long",
    }
}


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


export const AUTH_ERROR = {
    MISSING_OR_INVALID_TOKEN: 'Authorization token is missing or malformed.',
    TOKEN_NOT_PROVIDED: 'Bearer token is required in the Authorization header.',
    TOKEN_NOT_FOUND: 'Token not found in server (likely expired or deleted).',
    TOKEN_MISMATCH: 'Token has been revoked, replaced, or is invalid.',
    USER_NOT_FOUND: 'No user exists for the token provided.',
}


export const JWT_ERROR = {
    SIGNING_ERROR: 'Token generation failed. Please try again.',
    TOKEN_EXPIRED: 'Your session has expired. Please sign in again.',
    INVALID_TOKEN: 'Invalid authentication token provided.',
    VERIFICATION_FAILED: 'Authentication token verification failed.',
    INVALID_EXPIRY_FORMAT: "Expiry time format is invalid. Use a number followed by 's', 'm', 'h', or 'd'.",
    INVALID_EXPIRY_UNIT: "Expiry time unit is invalid. Allowed units are 's', 'm', 'h', or 'd'.",
}


export type ErrorDetails = typeof VALIDATION_ERROR_DETAILS[keyof typeof VALIDATION_ERROR_DETAILS]