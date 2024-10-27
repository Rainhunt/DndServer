import { Request } from "express";
import { UserPayload } from "./auth/jwt";

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
            customField2?: number;
        }
    }
}