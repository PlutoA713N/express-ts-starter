import { NextFunction, Request, Response } from "express";
import HTTP from "http-status-codes";
import {registerUserService} from "../../service/user.service/user.registration.service";
import {createSuccessResponse} from "../../factory/create.sucess.response";
import logger from "../../logger";
import {USER_CODES} from "../../constants/error.constants";
import {USER_MESSAGES} from "../../constants/success.constants";

export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {username, email, password} = req.body;
        const {user, token} = await registerUserService(username, email, password);
        res.status(HTTP.CREATED).json(
            createSuccessResponse({
                    status: HTTP.CREATED,
                    code: USER_CODES.USER_REGISTERED,
                    message: USER_MESSAGES.REGISTER_SUCCESS,
                    data:{
                        token,
                        userId: user._id.toString(),
                     }
            }
            ));
        return
    } catch (err: any) {
        logger.error("Error during user registration:", err);
        next(err)
    }
};

