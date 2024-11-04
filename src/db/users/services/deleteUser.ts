import createError from "../../../errors/createError";
import User, { IUser } from "../schema/User";

export default async function deleteUser(id: string): Promise<IUser> {
    try {
        const deleted = await User.findByIdAndDelete(id);
        if (!deleted) {
            createError("Mongoose", "User not found", 404);
        } else {
            return deleted;
        }
    } catch (err) {
        createError("Mongoose", "Internal Server Error", 500, err);
    }
}