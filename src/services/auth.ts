import { RequestHandler } from "express";
import config from "../Config/config";
import jwtAuth from "../middlewares/auth/jwt";
import { IUser } from "../db/users/schema/User";
import generateJwtToken from "../auth/jwt";

const authType = config.AUTH;

function getTokenGenerator(authType: string): (user: IUser) => string {
    switch (authType) {
        case "jwt":
        default:
            return generateJwtToken;
    }
}

function getAuth(authType: string): RequestHandler {
    switch (authType) {
        case "jwt":
        default:
            return jwtAuth;
    }
}

const auth: RequestHandler = getAuth(authType);
export const tokenGenerator: (user: IUser) => string = getTokenGenerator(authType);
export default auth;