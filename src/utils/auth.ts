import { compare, hash } from "bcrypt"
import { AppError } from "./../class/app.error.class";
import httpStatus from "http-status-codes";
import {ERROR_CODES, VALIDATION_ERROR_CODES} from "../constants/error.constants";

const generateHash = async (password: string): Promise<string> => {
    try {
        const userPasswordHash = await hash(password, 10)
        return userPasswordHash
    } catch (err) {
        throw new AppError(`Password hashing failed: ${(err instanceof Error ? err.message : String(err))}`, httpStatus.BAD_GATEWAY, ERROR_CODES.HASH_ERROR);
    }
}

const comparePassword = async (password: string, userPasswordHash: string): Promise<boolean> => {
    try {
        const result = await compare(password, userPasswordHash)
        return result
    } catch (err: any) {
        throw new AppError(
            `Password comparison failed: ${err instanceof Error ? err.message : 'An unexpected error occurred during password comparison'}`,
            httpStatus.INTERNAL_SERVER_ERROR,
            VALIDATION_ERROR_CODES.PASSWORD_COMPARISON_ERROR
        );
    }
}

export { comparePassword, generateHash }