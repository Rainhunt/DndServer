// loginUser.ts
import createError from "../../../errors/createError";
import { tokenGenerator } from "../../../services/auth";
import User, { IUser } from "../schema/User";

const MILLISECONDS_IN_DAY = 86400000;

export async function loginUser(email: string, password: string): Promise<string> {
    try {
        const user: IUser | null = await User.findOne({ email });
        if (user) {
            const now = new Date().getTime();
            const recentLoginAttempts = user.lastAttempts.filter((date) => {
                const diff = now - date;
                return diff >= 0 && diff <= MILLISECONDS_IN_DAY;
            });
            recentLoginAttempts.push(now);
            if (recentLoginAttempts.length > 3) {
                throw createError("Authentication", "Too many login attempts. Please try again later.", 429);
            }
            await User.updateOne({ email }, { $set: { lastAttempts: recentLoginAttempts } });
        }
        if (!user || !(await user.validatePassword(password))) {
            throw createError("Authentication", "Invalid email or password", 401);
        } else {
            await User.updateOne({ email }, { $set: { lastAttempts: [] } });
            return tokenGenerator(user);
        }
    } catch (err) {
        if (err instanceof Error &&
            (err.message === "Invalid email or password" ||
             err.message === "Too many login attempts. Please try again later.")) {
            throw err;
        }
        throw createError("Authentication", "Failed to log in user", 500, err);
    }
}
