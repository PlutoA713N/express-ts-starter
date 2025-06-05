import {model, Schema, Types} from "mongoose"

export interface IUser{
    _id: Types.ObjectId;
    username: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
}

const userSchema = new Schema<IUser>({
    username: {type: String, required: true, unique: true, trim: true, minlength:3, maxlength:20},
    email: {type: String, required: true, unique: true, trim: true,  match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/},
    password: {type: String, required: true, minlength: 8, match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/ },
}, {timestamps: true})

export const UserModel = model('User', userSchema)
