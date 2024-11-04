import createError from "../../../errors/createError";
import Monster, { IMonster } from "../schema/Monster";

export default async function getMonsters(id?: string): Promise<IMonster | IMonster[]> {
    try {
        if (id) {
            const monster = await Monster.findById(id);
            if (monster) {
                return monster.toObject({ virtuals: true });
            } else {
                createError("Mongoose", "Monster not found", 404);
            }
        } else {
            return await Monster.find();
        }
    } catch (err) {
        createError("Mongoose", "Internal Server Error", 500, err);
    }
}