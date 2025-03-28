import Monster, { IMonster } from "../schema/Monster";
import { createEntity, getEntity, updateEntity, deleteEntity } from "../../crud/crudOperations";

export function addMonster(newMonster: IMonster): Promise<IMonster> {
  return createEntity<IMonster>(Monster, newMonster);
}

export function getMonsters(id?: string): Promise<IMonster | IMonster[]> {
  return getEntity<IMonster>(Monster, id);
}

export function editMonster(id: string, monsterData: IMonster): Promise<IMonster> {
  return updateEntity<IMonster>(Monster, id, monsterData);
}

export function deleteMonster(id: string): Promise<IMonster> {
  return deleteEntity<IMonster>(Monster, id);
}
