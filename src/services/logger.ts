import { RequestHandler } from "express";
import config from "../Config/config";
import morganLogger from "../middlewares/loggers/morgan";

const logType = config.LOGGER;

function getLogger(logType: string): RequestHandler {
    switch (logType) {
        case "morgan":
        default:
            return morganLogger;
    }
}

const logger: RequestHandler = getLogger(logType);
export default logger;