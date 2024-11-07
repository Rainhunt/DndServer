import { Request, Response, Router } from "express";
import handleError, { catchError } from "../../errors/handleError";
import auth from "../../services/auth";
import { addMonster } from "../../db/monsters/services/addMonster";
import { validateNewMonsterBody } from "./requestValidators";
import { mapNewMonster } from "./requestSchemas/joi/mapNewMonster";
import getMonsters from "../../db/monsters/services/getMonsters";
import getMyMonsters from "../../db/monsters/services/getMyMonsters";
import createError from "../../errors/createError";
import deleteMonster from "../../db/monsters/services/deleteMonster";
import { IMonster } from "../../db/monsters/schema/Monster";

const router = Router();

router.post("/", auth, async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            handleError(res, 403, "You must be logged in to create a new monster");
        } else {
            const schemaError = validateNewMonsterBody(req.body);
            if (schemaError) {
                handleError(res, 400, schemaError);
            } else {
                let monster = mapNewMonster(req.body, user);
                monster = await addMonster(monster);
                res.send(monster);
            }
        }
    } catch (err) {
        catchError(res, err);
    }
});

router.delete("/:id", auth, async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const monster = await getMonsters(id) as IMonster;
        console.log(monster.createdBy.toString());
        console.log(user?._id);
        if (!user || (user._id !== monster.createdBy.toString() && !user.isAdmin)) {
            createError("Authorization", "You do not have permission to delete this monster", 403);
        } else {
            const deleted = await deleteMonster(id);
            res.send(deleted);
        }
    } catch (err) {
        catchError(res, err)
    }
});

router.get("/my-creations", auth, async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            handleError(res, 403, "You must be logged in to get your monsters");
        } else {
            const monsters = await getMyMonsters(user._id);
            res.send(monsters);
        }
    } catch (err) {
        catchError(res, err);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const monster = await getMonsters(id);
        res.send(monster);
    } catch (err) {
        catchError(res, err);
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const monsters = await getMonsters();
        res.send(monsters);
    } catch (err) {
        catchError(res, err);
    }
});

export { router as monsterCodexRouter };