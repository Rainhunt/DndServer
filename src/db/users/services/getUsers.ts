import createError from "../../../errors/createError";
import User, { IUser } from "../schema/User";

export default async function getUsers(id?: string): Promise<IUser | IUser[]> {
    try {
        if (id) {
            const user = await User.findById(id);
            if (user) {
                return user;
            } else {
                createError("Mongoose", "User not found", 404);
            }
        } else {
            return await User.find();
        }
    } catch (err) {
        createError("Mongoose", "Internal Server Error", 500, err);
    }
}