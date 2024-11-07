import createError from "../../../errors/createError";
import Monster, { IMonster } from "../schema/Monster";

export default async function getMyMonsters(userId: unknown): Promise<IMonster[]> {
    try {
        if (userId) {
            return await Monster.find({ createdBy: userId });
        } else {
            createError("Authentication", "User not found", 404)
        }
    } catch (err) {
        createError("Mongoose", "Internal Server Error", 500, err);
    }
}