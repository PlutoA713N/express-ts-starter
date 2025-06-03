import { Request, Response, NextFunction } from "express";
import {createSuccessResponse} from "../../factory/create.sucess.response";
import {userLoginService} from "../../service/user.service/user.login.service";
import HTTP from "http-status-codes";
import logger from "../../logger";
import { USER_EVENTS, USER_MESSAGES} from "../../constants/success.constants";

export async function handleUserLogin(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, username, password } = req.body;
        const {token, user} = await userLoginService(email, username, password)

        res.status(HTTP.OK).json(
            createSuccessResponse({message: USER_MESSAGES.LOGIN_SUCCESS, code: USER_EVENTS.LOGIN_SUCCESS,
                data:{
                token: token,
                userId: user._id.toString()
            },
            }))
        return
    } catch (err) {
        logger.error('Error caught in User login:', err)
        next(err)
    }
}