import {Model} from "mongoose";
import { AppError } from "./../../../class/app.error.class";
import HTTP from "http-status-codes";
import { MONGO_ERROR_CODES} from "../../../constants/error.constants";
import {UserModel} from "../../user/user.model";
import {createApiError} from "../../../factory/create.api.error";
import logger from "../../../logger";
import {AttachField, ICustomRequest} from "../../../interfaces/Request_interfaces";

interface CheckResult <T> {
    message: string,
    doc: T | null,
    isExists: boolean
}

export async function checkFieldExists<T = any>(model: Model<any>, field: string, value: string): Promise<CheckResult<T>> {
    try {
        const existingUser = await model.findOne({ [field]: value })
        if (existingUser) {
            return { message: `${field} exists`, doc: existingUser as T, isExists: true }
        }
        return { message: '', doc: null, isExists: false }
    } catch (error: any) {
        logger.error(`[DB Check Failed] ${field}: ${error.message}`);
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
            const result = await checkFieldExists(UserModel, field, value)
            if (result.isExists && result.doc) {
                return result.doc
            }
        }
    }

    return null
}


export async function validateAndAttach(model: Model<any>,fieldId: string, field: AttachField, req: ICustomRequest) {
    const result = await checkFieldExists(model,'_id', fieldId);
    if (!result.isExists) {
        throw createApiError({detail: `${field} does not exist`, status:HTTP.NOT_FOUND, code:`${field.toUpperCase()}_NOT_FOUND`});
    }

    (req as any)[field] = result.doc;
    return req
}