import Monster, { IMonster } from "../schema/Monster";
import { createEntity, getEntity, updateEntity, deleteEntity } from "../../crud/crudOperations";

export function addMonster(newMonster: IMonster): Promise<IMonster> {
  return createEntity<IMonster>(Monster, newMonster);
}

export async function getMonsters(id?: string): Promise<IMonster | IMonster[]> {
  const result = await getEntity<IMonster>(Monster, id);
  // If a single monster is returned and it has the toObject method, enable virtuals
  if (id && result && !Array.isArray(result) && typeof result.toObject === "function") {
    return result.toObject({ virtuals: true });
  }
  return result;
}


export function editMonster(id: string, monsterData: IMonster): Promise<IMonster> {
  return updateEntity<IMonster>(Monster, id, monsterData);
}

export function deleteMonster(id: string): Promise<IMonster> {
  return deleteEntity<IMonster>(Monster, id);
}
