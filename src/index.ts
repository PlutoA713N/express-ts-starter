import {app} from "./app";
import {config} from "dotenv";
import logger from "./logger";
import {closeDB, run} from "./config/mongodb.connection";
import {disconnect} from "mongoose";
import * as http from "node:http";

config()

const PORT = process.env.PORT || 3000;
let server: http.Server;

export async function main() {
    try{
        await run()
        server = app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`)
        })
    }catch(e){
        logger.error(`Error in starting the main(): ${e.message}`)
        await closeDB()
        process.exit(1)
    }
}


process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

async function gracefulShutdown() {
    try{
        logger.info('Shutting down server...');
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