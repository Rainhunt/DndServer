import User, { IUser } from "../schema/User";
import createError from "../../../errors/createError";

export async function registerUser(newUser: IUser): Promise<IUser> {
    try {
        let user: IUser = new User(newUser);
        user = await user.save();
        return user;
    } catch (err) {
        createError("Mongoose", "Email is already in use", 409);
    }
}