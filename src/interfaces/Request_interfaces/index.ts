import {IUser} from "../../models/user/user.model";
import {Request} from "express";

export interface ICustomRequest extends Request  {
    user?: IUser
}

export type AttachField = Extract<keyof ICustomRequest, string>;

