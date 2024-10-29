import createError from "../../../errors/createError";
import Monster, { IMonster } from "../schema/Monster";

export async function addMonster(newMonster: IMonster): Promise<IMonster> {
    try {
        let monster: IMonster = new Monster(newMonster);
        console.log("here2");
        monster = await monster.save();
        console.log("here3");
        return monster;
    } catch (err) {
        console.log("here4");
        if (err instanceof Error) {
            createError("Mongoose", err.message, 409);
        } else {
            console.log(err);
            createError("Mongoose", "unknown", 500);
        }
    }
}