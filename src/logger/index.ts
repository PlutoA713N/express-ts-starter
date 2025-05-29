import {config} from "dotenv";
import winston from "winston";
import "winston-daily-rotate-file";
import {requestContext} from "../context/requestContext";
import {environment} from "../types/environment.types";

const {PRODUCTION} = environment;
const {createLogger, format, transports} = winston;
const {File, Console} = transports;
const {colorize, combine, timestamp, printf, errors} = format;

config();


const logger = createLogger({
    level: process.env.LOG_LEVEL || (process.env.NODE_ENV === PRODUCTION ? "info" : "debug"),
    format: combine(
        colorize(),
        timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        errors({stack: true}),
        printf(({timestamp, level, message}) => {
            const store = requestContext?.getStore();
            const rid = store?.requestId ? ` [requestId=${store?.requestId}]` : "";
            return `[${timestamp}] ${level}:${rid} ${message}`;
        })
    ),
    transports: [
        new Console(),
        new File({filename: "logs/app.log"}),
        ...(process.env.NODE_ENV === 'production' ?
            [
                new File({
                    filename: "logs/errors.log",
                    level: "error"
                }),
                new File({
                    filename: "logs/combined.log"
                }),
                new transports.DailyRotateFile({
                    filename: "logs/http-%DATE%.log",
                    datePattern: "YYYY-MM-DD",
                    level: "http",
                    zippedArchive: true,
                    maxSize: "10m",
                    maxFiles: "14d"
                })
            ]
            : [])
    ]
});

export default logger;
