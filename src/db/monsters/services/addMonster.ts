import createError from "../../../errors/createError";
import Monster, { IMonster } from "../schema/Monster";

export async function addMonster(newMonster: IMonster): Promise<IMonster> {
    try {
        let monster: IMonster = new Monster(newMonster);
        monster = await monster.save();
        return monster;
    } catch (err) {
        if (err instanceof Error) {
            createError("Mongoose", err.message, 409);
        } else {
            createError("Mongoose", "unknown", 500);
        }
    }
}