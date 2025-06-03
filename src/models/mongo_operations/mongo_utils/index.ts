import {Model} from "mongoose";
import { AppError } from "./../../../class/app.error.class";
import HTTP from "http-status-codes";
import {ERROR_CODES, MONGO_ERROR_CODES} from "../../../constants/error.constants";
import {UserRegistrationModel} from "../../user/user.registration.model";

interface CheckResult <T> {
    message: string,
    user: T | null,
    isExists: boolean
}

export async function checkFieldExists<T = any>(model: Model<any>, field: string, value: string): Promise<CheckResult<T>> {
    try {
        const existingUser = await model.findOne({ [field]: value })
        if (existingUser) {
            return { message: `${[field]} already exists`, user: existingUser as T, isExists: true }
        }
        return { message: '', user: null, isExists: false }
    } catch (error) {
        throw new AppError(
            `Failed to check ${field}: ${error instanceof Error ? error.message : String(error)}`,
            HTTP.INTERNAL_SERVER_ERROR,
            MONGO_ERROR_CODES.DB_CHECK_ERROR
        );
    }
}

export const findUserByField = async (form: object) => {
    for (const [field, value] of Object.entries(form)) {
        if (value) {
            const result = await checkFieldExists(UserRegistrationModel, field, value)
            if (result.isExists && result.user) {
                return result.user
            }
        }
    }

    return null
}