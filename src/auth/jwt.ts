import "dotenv/config";
import { JwtPayload, sign } from "jsonwebtoken";
import { IUser } from "../db/users/schema/User";
import createError from "../errors/createError";

export interface UserPayload extends JwtPayload {
    _id: unknown,
    isAdmin: boolean
}

const jwtSecret = process.env.JWT_SECRET;

export default function generateJwtToken(user: IUser) {
    try {
        if (!jwtSecret) {
            createError("Server", "Internal Server Error", 500);
        } else {
            const payload: UserPayload = {
                _id: user._id,
                isAdmin: user.isAdmin
            }
            return sign(payload, jwtSecret);
        }
    } catch (err) {
        createError("Server", "Failed to Serialize Token", 400, err);
    }
}