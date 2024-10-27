import createError from "../../../errors/createError";
import { tokenGenerator } from "../../../services/auth";
import User, { IUser } from "../schema/User";

export async function loginUser(email: string, password: string): Promise<string> {
    try {
        const user: IUser | null = await User.findOne({ email });
        if (!user || !(await user.validatePassword(password))) {
            createError("Authentication", "Invalid email or password", 401);
        } else {
            return tokenGenerator(user);
        }
    } catch (err) {
        createError("Authentication", "Failed to log in user", 500, err);
    }
}