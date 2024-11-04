import createError from "../../../errors/createError";
import User, { IUser } from "../schema/User";

export default async function editUser(id: string, userInfo: IUser): Promise<IUser> {
    try {
        const updated = await User.findByIdAndUpdate(id, userInfo, { new: true, runValidators: true });
        if (!updated) {
            createError("Mongoose", "User not found", 404);
        } else {
            return updated;
        }
    } catch (err) {
        createError("Mongoose", "Internal Server Error", 500, err);
    }
}