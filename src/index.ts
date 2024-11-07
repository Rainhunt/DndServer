import "dotenv/config";
import express, { Express, NextFunction, Request, Response } from "express";
import corsOrigins from "./middlewares/cors";
import logger from "./services/logger";
import handleError from "./errors/handleError";
import router from "./router/router";
import connectToDB from "./services/db";
import chalk from "chalk";


const app: Express = express();
const port = process.env.PORT || 8181;

app.use(corsOrigins);
app.use(express.json());
app.use(logger);
app.use(express.static("./public"));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    handleError(res, 500, err.message || "Internal Server Error");
});

app.listen(port, async () => {
    console.log(chalk.blueBright(`Server is running at http://localhost:${port}`));
    await connectToDB();
});