import { Router, Request, Response } from "express";
import auth from "../../services/auth";
import { catchError } from "../../errors/handleError";
import { Types } from "mongoose";

import getMyGames from "../../db/games/services/getMyGames";
import { getGames, createGame, editGames, deleteGames, CreateGameInput } from "../../db/games/services/crud";
import { getUsers } from "../../db/users/services/crud";
import { getMaps, createMap, editMap, deleteMap, CreateMapInput } from "../../db/maps/services/crud";
import User, { IUser } from "../../db/users/schema/User";
import { GameModel, IGame } from "../../db/games/schema/games";
import createError from "../../errors/createError";

const router = Router();

// GET /my-games
router.get(
    "/my-games",
    auth,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.user;
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const games = await getMyGames(user._id);
            res.status(200).json({ gameIds: games.map(g => g._id) });
        } catch (err) {
            catchError(res, err);
        }
    }
);

// GET /games/:id - view game maps
router.get(
    "/games/:id",
    auth,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.user;
            const gameId = req.params.id;
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const userDoc = (await getUsers(user._id)) as IUser;
            if (!userDoc.games.some(g => g.toString() === gameId)) {
                res.status(403).json({ message: "You do not have access to this game." });
                return;
            }

            const game = await GameModel.findById(gameId)
                .populate("maps", "name _id")
                .lean<{ maps: { _id: Types.ObjectId; name: string }[] } & IGame>();
            if (!game) {
                res.status(404).json({ message: "Game not found." });
                return;
            }

            res.status(200).json({ maps: game.maps || [] });
        } catch (err) {
            catchError(res, err);
        }
    }
);

// POST /games - create a new game
router.post(
    "/games",
    auth,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.user;
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const {
                name,
                maps = [],
                players = [],
                gameDMs = [],
                gameAdmins = [],
                config,
            } = req.body as {
                name: string;
                maps?: string[];
                players?: string[];
                gameDMs?: string[];
                gameAdmins?: string[];
                config?: object;
            };

            const ownerId = new Types.ObjectId(user._id);
            const newGameInput: CreateGameInput = {
                name,
                owner: ownerId,
                maps: maps.map(id => new Types.ObjectId(id)),
                players: players.map(id => new Types.ObjectId(id)),
                gameDMs: gameDMs.map(id => new Types.ObjectId(id)),
                gameAdmins: gameAdmins.map(id => new Types.ObjectId(id)),
                config,
            };

            const created = await createGame(newGameInput);
            res.status(201).json({ gameId: created._id });
        } catch (err) {
            catchError(res, err);
        }
    }
);

// PUT /games/:id - edit a game (DM only)
router.put(
    "/games/:id",
    auth,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.user;
            const gameId = req.params.id;
            const updates = req.body;
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const game = (await getGames(gameId)) as IGame;
            if (!game) {
                res.status(404).json({ message: "Game not found." });
                return;
            }
            if (!game.gameDMs.some(id => id.toString() === user._id.toString())) {
                res.status(403).json({ message: "Only a DM can edit this game." });
                return;
            }

            const updated = await editGames(gameId, updates as IGame);
            res.status(200).json({ game: updated });
        } catch (err) {
            catchError(res, err);
        }
    }
);

// DELETE /games/:id - delete a game (Admin only)
router.delete(
    "/games/:id",
    auth,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.user;
            const gameId = req.params.id;
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const game = (await getGames(gameId)) as IGame;
            if (!game) {
                res.status(404).json({ message: "Game not found." });
                return;
            }
            if (!game.gameAdmins.some(id => id.toString() === user._id.toString())) {
                res.status(403).json({ message: "Only an Admin can delete this game." });
                return;
            }

            await deleteGames(gameId);
            res.status(204).send();
        } catch (err) {
            catchError(res, err);
        }
    }
);

// GET /map/:id - view map XML
router.get(
    "/map/:id",
    auth,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.user;
            const mapId = req.params.id;
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const map = await getMaps(mapId);
            if (!map || Array.isArray(map)) {
                res.status(404).json({ message: "Map not found" });
                return;
            }

            const game = await GameModel.findOne({ maps: map._id }).lean();
            if (!game) {
                res.status(404).json({ message: "Game not found" });
                return;
            }

            const userIdStr = user._id.toString();
            const isGameDM = game.gameDMs.some(id => id.toString() === userIdStr);
            const isRevealed = map.revealedTo?.some(id => id.toString() === userIdStr);
            if (!isGameDM && !isRevealed) {
                res.status(403).json({ message: "You do not have access to this map" });
                return;
            }

            res.status(200).json({ xml: map.tmxFile });
        } catch (err) {
            catchError(res, err);
        }
    }
);

// POST /map/:id/visibility
router.post(
    "/map/:id/visibility",
    auth,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.user;
            const mapId = req.params.id;
            const { revealUserIds = [], hideUserIds = [] } = req.body as { revealUserIds: string[]; hideUserIds: string[] };
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const map = await getMaps(mapId);
            if (!map || Array.isArray(map)) {
                res.status(404).json({ message: "Map not found" });
                return;
            }

            const game = await GameModel.findOne({ maps: map._id }).lean();
            if (!game) {
                res.status(404).json({ message: "Game not found" });
                return;
            }

            const userIdStr = user._id.toString();
            const isGameDM = game.gameDMs.some(id => id.toString() === userIdStr);
            if (!isGameDM) {
                res.status(403).json({ message: "You must be a Game DM to modify map visibility" });
                return;
            }

            const set = new Set(map.revealedTo?.map(id => id.toString()) || []);
            revealUserIds.forEach(id => set.add(id));
            hideUserIds.forEach(id => set.delete(id));
            map.revealedTo = Array.from(set).map(id => new Types.ObjectId(id));
            await map.save();

            res.status(200).json({ message: "Map visibility updated", revealedTo: map.revealedTo });
        } catch (err) {
            catchError(res, err);
        }
    }
);

// GET /map/:id/visibility
router.get(
    "/map/:id/visibility",
    auth,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.user;
            const mapId = req.params.id;
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const map = await getMaps(mapId);
            if (!map || Array.isArray(map)) {
                res.status(404).json({ message: "Map not found" });
                return;
            }

            const game = await GameModel.findOne({ maps: map._id }).lean();
            if (!game) {
                res.status(404).json({ message: "Game not found" });
                return;
            }

            const userIdStr = user._id.toString();
            const isGameDM = game.gameDMs.some(id => id.toString() === userIdStr);
            if (!isGameDM) {
                res.status(403).json({ message: "You must be a Game DM to view map visibility" });
                return;
            }

            res.status(200).json({ mapId: map._id, revealedTo: map.revealedTo || [] });
        } catch (err) {
            catchError(res, err);
        }
    }
);

// CRUD for maps: create, edit, delete

// POST /maps - create a new map
router.post(
    "/maps",
    auth,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.user;
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const { name, tmxFile, tilesets, revealedTo = [] } = req.body as { name: string; tmxFile: string; tilesets?: string; revealedTo?: string[] };
            const input: CreateMapInput = {
                name,
                tmxFile,
                tilesets,
                revealedTo: revealedTo.map(id => new Types.ObjectId(id)),
            };
            const created = await createMap(input);
            res.status(201).json({ mapId: created._id });
        } catch (err) {
            catchError(res, err);
        }
    }
);

// PUT /maps/:id - edit a map
router.put(
    "/maps/:id",
    auth,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.user;
            const mapId = req.params.id;
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            // Pull only the fields we care about from the raw body
            const { tilesets, revealedTo } = req.body as {
                tilesets?: string;
                revealedTo?: string[];
            };

            // Build a correctly‐typed update payload
            const updatePayload: Partial<CreateMapInput> = {};
            if (tilesets !== undefined) {
                updatePayload.tilesets = tilesets;
            }
            if (revealedTo !== undefined) {
                updatePayload.revealedTo = revealedTo.map(id => new Types.ObjectId(id));
            }

            const updated = await editMap(mapId, updatePayload);
            res.status(200).json({ map: updated });
        } catch (err) {
            catchError(res, err);
        }
    }
);


// DELETE /maps/:id - delete a map
router.delete(
    "/maps/:id",
    auth,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.user;
            const mapId = req.params.id;
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            await deleteMap(mapId);
            res.status(204).send();
        } catch (err) {
            catchError(res, err);
        }
    }
);

export { router as gameRouter };
