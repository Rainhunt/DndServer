import createError from "../../../errors/createError";
import Monster, { IMonster } from "../schema/Monster";

export default async function getMyMonsters(userId: unknown): Promise<IMonster[]> {
  if (!userId) {
    // Throw immediately if userId is missing
    createError("Authentication", "User not found", 404);
  }
  try {
    return await Monster.find({ createdBy: userId });
  } catch (err) {
    createError("Mongoose", "Internal Server Error", 500, err);
  }
}
