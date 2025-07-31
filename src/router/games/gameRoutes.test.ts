// src/db/games/services/getMyGames.test.ts

import { Types } from "mongoose";
import { IGame } from "../../db/games/schema/games";
import getMyGames from "../../db/games/services/getMyGames";
import User, { IUser } from "../../db/users/schema/User";

// --- router test dependencies ---
import request from "supertest";
import express, { Express } from "express";
import bodyParser from "body-parser";

// define dummyUserId for mocking auth and reuse in endpoint tests
const dummyUserId = new Types.ObjectId().toHexString();

// mock auth middleware before loading the router
jest.mock("../../../services/auth", () => ({
    __esModule: true,
    default: (_req: any, _res: any, next: any) => {
        _req.user = { _id: dummyUserId };
        next();
    },
}));

import * as gameCrud from "../../db/games/services/crud";
import * as mapCrud from "../../db/maps/services/crud";
import * as userCrud from "../../db/users/services/crud";
import { GameModel } from "../../db/games/schema/games";
import {gameRouter} from "./gameRoutes";

// ---------------- tests for getMyGames service ----------------
describe("getMyGames", () => {
    const fakeUserId = "userId";
    // cast via unknown to satisfy TS2352
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
        await expect(getMyGames(undefined as any)).rejects.toThrowError(
            /User not found/
        );
    });

    it("rejects when user is not found", async () => {
        jest.spyOn(User, "findById").mockReturnValueOnce({
            populate: () => Promise.resolve(null),
        } as any);

        await expect(getMyGames(fakeUserId)).rejects.toThrowError(/User not found/);
        expect(User.findById).toHaveBeenCalledWith(fakeUserId);
    });

    it("returns user.games when user is found", async () => {
        jest.spyOn(User, "findById").mockReturnValueOnce({
            populate: () => Promise.resolve({ games: fakeGames } as unknown as IUser),
        } as any);

        await expect(getMyGames(fakeUserId)).resolves.toEqual(fakeGames);
        expect(User.findById).toHaveBeenCalledWith(fakeUserId);
    });

    it("rejects with internal error when population throws", async () => {
        const internalError = new Error("db error");
        jest.spyOn(User, "findById").mockReturnValueOnce({
            populate: () => Promise.reject(internalError),
        } as any);

        await expect(getMyGames(fakeUserId)).rejects.toThrowError(/Internal Server Error/);
        expect(User.findById).toHaveBeenCalledWith(fakeUserId);
    });
});

// ------------ tests for gameRouter endpoints ------------
describe("gameRouter endpoints", () => {
    let app: Express;

    beforeAll(() => {
        app = express();
        app.use(bodyParser.json());
        app.use("/api", gameRouter);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("GET /my-games returns 200 and game IDs list", async () => {
        const fakeIds = [new Types.ObjectId(), new Types.ObjectId()];
        // mock the getMyGames service
        (getMyGames as jest.Mock).mockResolvedValue(
            fakeIds.map(id => ({ _id: id })) as any
        );

        const res = await request(app).get("/api/my-games").expect(200);
        expect(res.body).toHaveProperty("gameIds");
        expect(res.body.gameIds).toEqual(fakeIds.map(id => id.toHexString()));
    });

    it("POST /games creates a game and returns 201 with gameId", async () => {
        const newGameId = new Types.ObjectId();
        const payload = { name: "Test Game", maps: [], players: [], gameDMs: [], gameAdmins: [], config: {} };
        jest.spyOn(gameCrud, "createGame").mockResolvedValue({ _id: newGameId } as any);

        const res = await request(app).post("/api/games").send(payload).expect(201);
        expect(res.body).toEqual({ gameId: newGameId.toHexString() });
    });

    it("PUT /games/:id edits a game and returns 200 with updated game", async () => {
        const gameId = new Types.ObjectId().toHexString();
        const updates = { name: "Updated" };
        jest.spyOn(gameCrud, "getGames").mockResolvedValue({ gameDMs: [dummyUserId] } as any);
        jest.spyOn(gameCrud, "editGames").mockResolvedValue({ _id: gameId, ...updates } as any);

        const res = await request(app)
            .put(`/api/games/${gameId}`)
            .send(updates)
            .expect(200);
        expect(res.body.game.name).toBe("Updated");
    });

    it("DELETE /games/:id deletes a game and returns 204", async () => {
        const gameId = new Types.ObjectId().toHexString();
        jest.spyOn(gameCrud, "getGames").mockResolvedValue({ gameAdmins: [dummyUserId] } as any);
        jest.spyOn(gameCrud, "deleteGames").mockResolvedValue(undefined as any);

        await request(app).delete(`/api/games/${gameId}`).expect(204);
    });

    it("GET /games/:id returns maps list when authorized", async () => {
        const gameId = new Types.ObjectId().toHexString();
        const fakeMaps = [{ _id: new Types.ObjectId(), name: "Map1" }];
        jest.spyOn(userCrud, "getUsers").mockResolvedValue({ games: [gameId] } as any);
        jest.spyOn(GameModel, "findById").mockReturnValue({
            populate: () => Promise.resolve({ maps: fakeMaps }),
        } as any);

        const res = await request(app).get(`/api/games/${gameId}`).expect(200);
        expect(res.body.maps).toEqual(fakeMaps);
    });

    it("GET /map/:id returns xml when user is DM or revealed", async () => {
        const mapId = new Types.ObjectId();
        const xml = '<tmx></tmx>';
        const fakeMap: any = { _id: mapId, tmxFile: xml, revealedTo: [dummyUserId], save: jest.fn() };
        jest.spyOn(mapCrud, "getMaps").mockResolvedValue(fakeMap);
        jest.spyOn(GameModel, "findOne").mockReturnValue({
            lean: () => Promise.resolve({ gameDMs: [], maps: [mapId] }),
        } as any);

        const res = await request(app)
            .get(`/api/map/${mapId.toHexString()}`)
            .expect(200);
        expect(res.body.xml).toBe(xml);
    });

    it("POST /map/:id/visibility updates and returns revealedTo array", async () => {
        const mapId = new Types.ObjectId();
        const fakeMap: any = { _id: mapId, revealedTo: [], save: jest.fn() };
        jest.spyOn(mapCrud, "getMaps").mockResolvedValue(fakeMap);
        jest.spyOn(GameModel, "findOne").mockReturnValue({
            lean: () => Promise.resolve({ gameDMs: [dummyUserId], maps: [mapId] }),
        } as any);

        const res = await request(app)
            .post(`/api/map/${mapId.toHexString()}/visibility`)
            .send({ revealUserIds: [dummyUserId], hideUserIds: [] })
            .expect(200);
        expect(res.body.revealedTo).toEqual([new Types.ObjectId(dummyUserId).toHexString()]);
    });

    it("GET /map/:id/visibility returns revealedTo list", async () => {
        const mapId = new Types.ObjectId();
        const fakeMap: any = { _id: mapId, revealedTo: [dummyUserId] };
        jest.spyOn(mapCrud, "getMaps").mockResolvedValue(fakeMap);
        jest.spyOn(GameModel, "findOne").mockReturnValue({
            lean: () => Promise.resolve({ gameDMs: [dummyUserId], maps: [mapId] }),
        } as any);

        const res = await request(app)
            .get(`/api/map/${mapId.toHexString()}/visibility`)
            .expect(200);
        expect(res.body.revealedTo).toEqual([new Types.ObjectId(dummyUserId).toHexString()]);
    });

    it("POST /maps creates a map and returns 201 with mapId", async () => {
        const newMapId = new Types.ObjectId();
        jest.spyOn(mapCrud, "createMap").mockResolvedValue({ _id: newMapId } as any);

        const res = await request(app)
            .post("/api/maps")
            .send({ name: "MapName", tmxFile: "<tmx/>", tilesets: "", revealedTo: [] })
            .expect(201);
        expect(res.body).toEqual({ mapId: newMapId.toHexString() });
    });

    it("PUT /maps/:id edits a map and returns 200 with updated map", async () => {
        const mapId = new Types.ObjectId();
        jest.spyOn(mapCrud, "editMap").mockResolvedValue({ _id: mapId, tilesets: "new" } as any);

        const res = await request(app)
            .put(`/api/maps/${mapId.toHexString()}`)
            .send({ tilesets: "new", revealedTo: [] })
            .expect(200);
        expect(res.body.map.tilesets).toBe("new");
    });

    it("DELETE /maps/:id deletes a map and returns 204", async () => {
        const mapId = new Types.ObjectId();
        jest.spyOn(mapCrud, "deleteMap").mockResolvedValue(undefined as any);

        await request(app)
            .delete(`/api/maps/${mapId.toHexString()}`)
            .expect(204);
    });
});
