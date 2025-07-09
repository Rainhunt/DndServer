// src/db/games/services/crud.test.ts

// Mock the underlying CRUD operations.
jest.mock("../../crud/crudOperations", () => ({
    createEntity: jest.fn(),
    getEntity: jest.fn(),
    updateEntity: jest.fn(),
    deleteEntity: jest.fn(),
}));

import { CreateGameInput, createGame, getGames, editGames, deleteGames } from "./crud";
import { GameModel, IGame } from "../schema/games";
import {
    createEntity,
    getEntity,
    updateEntity,
    deleteEntity,
} from "../../crud/crudOperations";
import { Types } from "mongoose";

describe("Game CRUD functions", () => {
    // A fake game object for testing.
    const fakeGame: IGame = ({
        _id: "gameId",
        name: "Test Game",
        owner: "ownerId",
        maps: ["mapId"] as unknown as Types.ObjectId[],
        players: [] as unknown as Types.ObjectId[],
        gameDMs: ["dmId"] as unknown as Types.ObjectId[],
        gameAdmins: ["adminId"] as unknown as Types.ObjectId[],
        config: { setting: true },
    } as unknown) as IGame;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createGame", () => {
        it("should call createEntity and return the created game", async () => {
            (createEntity as jest.Mock).mockResolvedValue(fakeGame);

            const input: CreateGameInput = {
                name: fakeGame.name,
                owner: fakeGame.owner,
                maps: fakeGame.maps,
                players: fakeGame.players,
                gameDMs: fakeGame.gameDMs,
                gameAdmins: fakeGame.gameAdmins,
                config: fakeGame.config,
            };

            const result = await createGame(input);
            expect(createEntity).toHaveBeenCalledWith(GameModel, input);
            expect(result).toBe(fakeGame);
        });
    });

    describe("getGames", () => {
        it("should return a single game when id is provided", async () => {
            (getEntity as jest.Mock).mockResolvedValue(fakeGame);

            const result = await getGames("gameId");
            expect(getEntity).toHaveBeenCalledWith(GameModel, "gameId");
            expect(result).toBe(fakeGame);
        });

        it("should return an array of games when id is not provided", async () => {
            const array = [
                fakeGame,
                { ...fakeGame, _id: "gameId2" } as unknown as IGame,
            ];
            (getEntity as jest.Mock).mockResolvedValue(array);

            const result = await getGames();
            expect(getEntity).toHaveBeenCalledWith(GameModel, undefined);
            expect(result).toBe(array);
        });
    });

    describe("editGames", () => {
        it("should call updateEntity and return the updated game", async () => {
            const updatedGame = ({ ...fakeGame, name: "Updated Game" } as unknown) as IGame;
            (updateEntity as jest.Mock).mockResolvedValue(updatedGame);

            const result = await editGames("gameId", updatedGame);
            expect(updateEntity).toHaveBeenCalledWith(GameModel, "gameId", updatedGame);
            expect(result).toBe(updatedGame);
        });
    });

    describe("deleteGames", () => {
        it("should call deleteEntity and return the deleted game", async () => {
            (deleteEntity as jest.Mock).mockResolvedValue(fakeGame);

            const result = await deleteGames("gameId");
            expect(deleteEntity).toHaveBeenCalledWith(GameModel, "gameId");
            expect(result).toBe(fakeGame);
        });
    });
});
