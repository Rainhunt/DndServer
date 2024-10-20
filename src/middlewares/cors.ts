import cors from "cors";
import { RequestHandler } from "express";

const corsOrigins: RequestHandler = cors({
    origin: [
        "http://localhost:8181"
    ]
});

export default corsOrigins;