import { Router, Request, Response } from "express";
import auth from "../../services/auth";
import { catchError } from "../../errors/handleError";
import { Types } from "mongoose";

import getMyGames from "../../db/games/services/getMyGames";
import { getGames } from "../../db/games/services/crud";
import { getUsers } from "../../db/users/services/crud";
import { getMaps } from "../../db/maps/services/crud";
import User, { IUser } from "../../db/users/schema/User";
import { GameModel } from "../../db/games/schema/games";
import createError from "../../errors/createError";

const router = Router();

// GET /my-games
router.get("/my-games", auth, async (req: Request, res: Response): Promise<void> => {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const games = await getMyGames(user._id);
        const gameIds = games.map((g) => g._id);
        res.status(200).json({ gameIds });
    } catch (err) {
        catchError(res, err);
    }
});

// GET /games/:id
router.get("/games/:id", auth, async (req: Request, res: Response): Promise<void> => {
    try {
        const user = req.user;
        const gameId = req.params.id;

        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const userDoc = await getUsers(user._id) as IUser;
        const ownsGame = userDoc.games.some((g: Types.ObjectId) => g.toString() === gameId);

        if (!ownsGame) {
            res.status(403).json({ message: "You do not have access to this game." });
            return;
        }

        const game = await GameModel.findById(gameId).populate("maps", "name _id").lean();
        if (!game) {
            res.status(404).json({ message: "Game not found." });
            return;
        }

        res.status(200).json({ maps: game.maps || [] });
    } catch (err) {
        catchError(res, err);
    }
});

// GET /map/:id
router.get("/map/:id", auth, async (req: Request, res: Response): Promise<void> => {
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
        const isGameDM = game.gameDMs.some((id: Types.ObjectId) => id.toString() === userIdStr);
        const isRevealed = map.revealedTo?.some((id: Types.ObjectId) => id.toString() === userIdStr);

        if (!isGameDM && !isRevealed) {
            res.status(403).json({ message: "You do not have access to this map" });
            return;
        }

        res.status(200).json({ xml: map.tmxFile });
    } catch (err) {
        catchError(res, err);
    }
});

// POST /map/:id/visibility
router.post("/map/:id/visibility", auth, async (req: Request, res: Response): Promise<void> => {
    try {
        const user = req.user;
        const mapId = req.params.id;
        const { revealUserIds = [], hideUserIds = [] }: { revealUserIds: string[], hideUserIds: string[] } = req.body;

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
        const isGameDM = game.gameDMs.some((id: Types.ObjectId) => id.toString() === userIdStr);

        if (!isGameDM) {
            res.status(403).json({ message: "You must be a Game DM to modify map visibility" });
            return;
        }

        const revealedToSet = new Set(map.revealedTo?.map((id: Types.ObjectId) => id.toString()) || []);
        for (const uid of revealUserIds) revealedToSet.add(uid);
        for (const uid of hideUserIds) revealedToSet.delete(uid);

        map.revealedTo = Array.from(revealedToSet).map(id => new Types.ObjectId(id));
        await map.save();

        res.status(200).json({ message: "Map visibility updated", revealedTo: map.revealedTo });
    } catch (err) {
        catchError(res, err);
    }
});

// GET /map/:id/visibility
router.get("/map/:id/visibility", auth, async (req: Request, res: Response): Promise<void> => {
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
        const isGameDM = game.gameDMs.some((id: Types.ObjectId) => id.toString() === userIdStr);

        if (!isGameDM) {
            res.status(403).json({ message: "You must be a Game DM to view map visibility" });
            return;
        }

        res.status(200).json({
            mapId: map._id,
            revealedTo: map.revealedTo || [],
        });
    } catch (err) {
        catchError(res, err);
    }
});

export { router as gameRouter };
