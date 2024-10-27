import "dotenv/config";
import { NextFunction, Request, request, RequestHandler, Response } from "express";
import createError from "../../errors/createError";
import { JwtPayload, verify } from "jsonwebtoken";
import { catchError } from "../../errors/handleError";
import { UserPayload } from "../../auth/jwt";

const jwtSecret = process.env.JWT_SECRET;

function verifyToken(token: string): UserPayload {
    try {
        if (!jwtSecret) {
            createError("Server", "Internal Server Error", 500);
        } else {
            return verify(token, jwtSecret) as UserPayload;
        }
    } catch (err) {
        createError("Authentication", "Unauthorized User", 401, err);
    }
}

const jwtAuth: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            createError("Authentication", "Please Log In", 401);
        } else {
            req.user = verifyToken(token);
            next();
        }
    } catch (err) {
        catchError(res, err);
    }
}

export default jwtAuth;