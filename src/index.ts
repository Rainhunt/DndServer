import "dotenv/config";
import express, { Express, Request, Response } from "express";
import corsOrigins from "./middlewares/cors";
import logger from "./services/logger";


const app: Express = express();
const port = process.env.PORT || 8181;

app.use(corsOrigins);
app.use(express.json());
app.use(logger);
app.use(express.static("./public"));

app.get("/", (req: Request, res: Response) => {
    res.send("Response from Server");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});