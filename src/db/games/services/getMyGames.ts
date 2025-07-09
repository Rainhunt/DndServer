import createError from "../../../errors/createError";
import { GameModel, IGame } from "../schema/games";
import User, { IUser } from "../../users/schema/User";

export default async function getMyGames(userId: unknown): Promise<IGame[]> {
    if (!userId) {
        return Promise.reject(createError("Authentication", "User not found", 404));
    }

    try {
        const user: IUser | null = await User.findById(userId).populate("games");

        if (!user) {
            return Promise.reject(createError("User", "User not found", 404));
        }

        return user.games as unknown as IGame[];
    } catch (err) {
        return Promise.reject(createError("Mongoose", "Internal Server Error", 500, err));
    }
}
