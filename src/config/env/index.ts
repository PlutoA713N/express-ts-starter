import { config } from "dotenv";
import { AppError } from "./../../class/app.error.class";
config()

export function getEnv(key: string, required = true, fallback?: string): string {
    const value = process.env[key];
    if (!value && required && !fallback) {
        throw new AppError(`${key} is missing in environment variables`, 500, `ENV_${key}_MISSING`)
    }
    return value || fallback!
}