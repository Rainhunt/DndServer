import { Router, Request, Response } from "express";
import { GameModel } from "../../db/games/schema/games";
import auth from "../../services/auth";
import { catchError } from "../../errors/handleError";
import User from "../../db/users/schema/User";
import {MapModel} from "../../db/maps/schema/maps";
import { Types } from "mongoose";

const router = Router();

// GET /my-games
router.get("/my-games", auth, async (req: Request, res: Response): Promise<void> => {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const userDoc = await User.findById(user._id).populate("games", "_id").lean();
        if (!userDoc) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const gameIds = userDoc.games?.map((game: any) => game._id) || [];
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

        const userDoc = await User.findById(user._id).lean();
        if (!userDoc || !userDoc.games?.some(g => g.toString() === gameId)) {
            res.status(403).json({ message: "You do not have access to this game." });
            return;
        }

        const game = await GameModel.findById(gameId).populate("maps", "name _id").lean();
        if (!game) {
            res.status(404).json({ message: "Game not found." });
            return;
        }

        const maps = game.maps || [];
        res.status(200).json({ maps });
    } catch (err) {
        catchError(res, err);
    }
});

router.get("/map/:id", auth, async (req: Request, res: Response): Promise<void> => {
    try {
        const user = req.user;
        const mapId = req.params.id;

        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const map = await MapModel.findById(mapId).lean();
        if (!map) {
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

        res.status(200).json({ xml: map.xmlContent });
    } catch (err) {
        catchError(res, err);
    }
});

router.post("/map/:id/visibility", auth, async (req: Request, res: Response): Promise<void> => {
    try {
        const user = req.user;
        const mapId = req.params.id;
        const { revealUserIds = [], hideUserIds = [] }: { revealUserIds: string[], hideUserIds: string[] } = req.body;

        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const map = await MapModel.findById(mapId);
        if (!map) {
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

        // Convert current list to Set for easy add/remove
        const revealedToSet = new Set(map.revealedTo?.map((id: Types.ObjectId) => id.toString()) || []);

        for (const uid of revealUserIds) {
            revealedToSet.add(uid);
        }

        for (const uid of hideUserIds) {
            revealedToSet.delete(uid);
        }

        map.revealedTo = Array.from(revealedToSet).map(id => new Types.ObjectId(id));
        await map.save();

        res.status(200).json({ message: "Map visibility updated", revealedTo: map.revealedTo });
    } catch (err) {
        catchError(res, err);
    }
});

router.get("/map/:id/visibility", auth, async (req: Request, res: Response): Promise<void> => {
    try {
        const user = req.user;
        const mapId = req.params.id;

        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const map = await MapModel.findById(mapId).lean();
        if (!map) {
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