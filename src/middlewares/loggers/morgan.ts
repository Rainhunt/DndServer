import chalk from "chalk";
import { Request, RequestHandler, Response } from "express";
import morgan, { TokenIndexer } from "morgan";

const morganLogger: RequestHandler = morgan((tokens: TokenIndexer<Request, Response>, req: Request, res: Response) => {
    const t = new Date();
    const log = [
        `[${t.getFullYear()}/${t.getMonth() + 1}/${t.getDate()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}]`,
        `${tokens.method(req, res)} ${tokens.url(req, res)}`,
        tokens.status(req, res),
        `${tokens["response-time"](req, res)} ms`,
    ].join(" | ");

    if (res.statusCode >= 400) {
        return chalk.redBright(log);
    } else {
        return chalk.cyanBright(log);
    }
});

export default morganLogger;