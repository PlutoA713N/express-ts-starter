import {IUser} from "../../models/user/user.model";
import {IPost} from "../../models/post/post.model";
import {Request} from "express";

export interface ICustomRequest extends Request  {
    user?: IUser
    post?: IPost
}

export type AttachField = Extract<keyof ICustomRequest, string>;

