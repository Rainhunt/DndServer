import createError from "../../../errors/createError";
import Monster, { IMonster } from "../schema/Monster";

export default async function deleteMonster(id: string): Promise<IMonster> {
    try {
        const deleted = await Monster.findByIdAndDelete(id);
        if (!deleted) {
            createError("Mongoose", "User not found", 404);
        } else {
            return deleted;
        }
    } catch (err) {
        createError("Mongoose", "Internal Server Error", 500, err);
    }
}