import {config} from "dotenv";
import {app} from "./app";
import * as http from "node:http";
import {closeDB, run} from "./config/mongodb/mongodb.connection";
import {disconnect} from "mongoose";
import {closeRedis, initRedis} from "./config/redis/redis.client";
import logger from "./logger";

config()

const PORT = process.env.PORT || 3000;
let server: http.Server;

export async function main() {
    try{
        await run()
        await initRedis()
        server = app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`)
        })
    }catch(e: any){
        logger.error(`Error in starting the main(): ${e.message}`)
        await closeDB();
        await closeRedis();
        if (server) {
            server.close(() => {
                logger.info('Server closed due to error');
                process.exit(1);
            });
        }
            process.exit(1);
    }
}


process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

async function gracefulShutdown() {
    try{
        logger.info('Shutting down server...');
        await closeDB();
        await closeRedis();
        await disconnect();
        if(server){
            server.close(() => {
                logger.info('Server closed');
                process.exit(0);
            });
        }else{
            process.exit(0);
        }
    }catch(e){
        logger.error(`Error in graceful shutdown: ${e}`)
        process.exit(1)
    }
}

main()