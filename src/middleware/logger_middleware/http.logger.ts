import morgan from "morgan";
import logger from "../../logger";

const stream = {
    write: (message: string) => {
        logger.http(message.trim());
    },
};

const httpLogger = morgan("combined", {stream});

export default httpLogger;
