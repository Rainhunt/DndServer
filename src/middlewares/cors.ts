import "dotenv/config";
import cors from "cors";
import { RequestHandler } from "express";

const origins: Array<string> = process.env.CORS_ORIGINS?.split(",") || ["http://localhost:8181"];

const corsOrigins: RequestHandler = cors({
    origin: origins
});

export default corsOrigins;