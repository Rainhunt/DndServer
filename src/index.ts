import 'dotenv/config';
import express, { Express, Request, Response } from "express";


const app: Express = express();
const port = process.env.PORT || 8181;

app.get("/", (req: Request, res: Response) => {
    res.send("Response from Server");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});