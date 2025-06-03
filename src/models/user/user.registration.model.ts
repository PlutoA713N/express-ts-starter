import  { Types, model, Schema , Document} from "mongoose"

export interface IUserRegistration{
    username: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface IUser extends IUserRegistration {
    _id: Types.ObjectId;
}

export interface IUserLogin extends Document {
    username?: string;
    email?: string;
    password: string;
}

const userRegistrationSchema = new Schema<IUserRegistration>({
    username: {type: String, required: true, unique: true, trim: true, minlength:3, maxlength:20},
    email: {type: String, required: true, unique: true, trim: true,  match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/},
    password: {type: String, required: true, minlength: 8, match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/ },
}, {timestamps: true})

export const UserRegistrationModel = model('UserRegistration', userRegistrationSchema)
