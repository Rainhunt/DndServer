import chalk from "chalk";
import { Response } from "express";

export default function handleError(res: Response, status: number, message = ""): Response {
    console.log(chalk.redBright(message));
    return res.status(status).send(message);
}