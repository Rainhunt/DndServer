import { createEntity, getEntity, updateEntity, deleteEntity } from "../../crud/crudOperations";
import {GameModel, IGame} from "../schema/games";
import {Types} from "mongoose";

export type CreateGameInput = {
    name: string;
    owner: Types.ObjectId;
    maps: Types.ObjectId[];
    players: Types.ObjectId[];
    gameDMs: Types.ObjectId[];
    gameAdmins: Types.ObjectId[];
    config?: object;
};

export function createGame(newGame: CreateGameInput): Promise<IGame> {
    return createEntity<IGame, CreateGameInput>(GameModel, newGame);
}


export function getGames(id?: string): Promise<IGame | IGame[]> {
    return getEntity<IGame>(GameModel, id);
}

export function editGames(id: string, userInfo: IGame): Promise<IGame> {
    return updateEntity<IGame>(GameModel, id, userInfo);
}

export function deleteGames(id: string): Promise<IGame> {
    return deleteEntity<IGame>(GameModel, id);
}
