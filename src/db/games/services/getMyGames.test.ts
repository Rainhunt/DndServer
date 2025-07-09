// src/db/games/services/getMyGames.test.ts

import getMyGames from "./getMyGames";
import User, { IUser } from "../../users/schema/User";
import createError from "../../../errors/createError";
import { IGame } from "../schema/games";
import { Types } from "mongoose";

describe("getMyGames", () => {
    const fakeUserId = "userId";
    const fakeGames: IGame[] = [
        ({
            _id: new Types.ObjectId("507f1f77bcf86cd799439011"),
            name: "Game One",
            owner: new Types.ObjectId("507f1f77bcf86cd799439012"),
            maps: [new Types.ObjectId("507f1f77bcf86cd799439013")],
            players: [],
            gameDMs: [new Types.ObjectId("507f1f77bcf86cd799439014")],
            gameAdmins: [new Types.ObjectId("507f1f77bcf86cd799439015")],
            config: {},
        } as unknown as IGame),
    ];

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("rejects when userId is missing", async () => {
        await expect(getMyGames(undefined)).rejects.toThrowError(
            /User not found/
        );
    });

    it("rejects when user is not found", async () => {
        jest.spyOn(User, "findById").mockImplementation((): any => ({
            populate: () => Promise.resolve(null),
        }));

        await expect(getMyGames(fakeUserId)).rejects.toThrowError(
            /User not found/
        );
        expect(User.findById).toHaveBeenCalledWith(fakeUserId);
    });

    it("returns user.games when user is found", async () => {
        const fakeUser: Partial<IUser> = {
            games: fakeGames as any,
        };
        jest.spyOn(User, "findById").mockImplementation((): any => ({
            populate: () => Promise.resolve(fakeUser),
        }));

        await expect(getMyGames(fakeUserId)).resolves.toBe(fakeGames);
        expect(User.findById).toHaveBeenCalledWith(fakeUserId);
    });

    it("rejects with internal error when population throws", async () => {
        const internalError = new Error("db error");
        jest.spyOn(User, "findById").mockImplementation((): any => ({
            populate: () => Promise.reject(internalError),
        }));

        await expect(getMyGames(fakeUserId)).rejects.toThrowError(
            /Internal Server Error/
        );
        expect(User.findById).toHaveBeenCalledWith(fakeUserId);
    });
});
