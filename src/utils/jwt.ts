import { sign, verify, SignOptions } from "jsonwebtoken"
import {config} from "dotenv";
import {getEnv} from "../config/env";

config()
export interface IDecodedToken {
    userId: string,
    username: string,
    email: string,
    createdAt: string,
    iat: number,
    exp: number
}

const SECRET_KEY: string = getEnv('JWT_SECRET_KEY')

const jwtSign = (payload: object, expiryTime: string | number = '24h'): string => {
    try {
        const time = convertToSeconds(expiryTime)

        const options: SignOptions = {
            algorithm: 'HS256',
            expiresIn: time
        }

        return sign(payload, SECRET_KEY, options)
    } catch (error) {
        console.error('JWT signing error:', error)
        throw new Error('Error in token generation:' + (error instanceof Error ? error.message : String(error)))
    }
}


const verifyJwtToken = (token: string): IDecodedToken => {
    try {
        const decoded = verify(token, SECRET_KEY)
        return decoded as IDecodedToken
    } catch (error) {
        throw new Error('Error in token verification:' + (error instanceof Error ? error.message : String(error)))
    }
}


export const convertToSeconds = (expiryTime: string | number): number => {
    if (typeof expiryTime === "number") {
        return expiryTime;
    }

    const match = expiryTime.match(/^(\d+)([smhd])$/);
    if (!match) {
        throw new Error("Invalid expiryTime format. Use 's', 'm', 'h', or 'd' as units.");
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
        case 's': return value;
        case 'm': return value * 60;
        case 'h': return value * 60 * 60;
        case 'd': return value * 60 * 60 * 24;
        default: throw new Error("Invalid unit. Use 's', 'm', 'h', or 'd'.");
    }
};


export { verifyJwtToken, jwtSign }