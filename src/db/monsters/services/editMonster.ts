import createError from "../../../errors/createError";
import Monster, { IMonster } from "../schema/Monster";

export default async function editMonster(id: string, monsterData: IMonster): Promise<IMonster> {
    try {
        const updated = await Monster.findByIdAndUpdate(id, monsterData, { new: true, runValidators: true });
        if (!updated) {
            createError("Mongoose", "Monster not found", 404);
        } else {
            return updated;
        }
    } catch (err) {
        createError("Mongoose", "Internal Server Error", 500, err);
    }
}