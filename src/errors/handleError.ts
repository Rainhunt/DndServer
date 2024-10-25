import chalk from "chalk";
import { Response } from "express";
import { ServerError } from "./createError";

export default function handleError(res: Response, status: number, message = ""): Response {
    console.log(chalk.redBright(message));
    return res.status(status).send(message);
}

export function catchError(res: Response, err: unknown) {
    if (err instanceof ServerError) {
        handleError(res, err.status || 400, err.message);
    } else {
        const error = err as Error;
        handleError(res, 400, error.message);
    }
}