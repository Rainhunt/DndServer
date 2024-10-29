import { Request, Response, Router } from "express";
import handleError, { catchError } from "../../errors/handleError";
import auth from "../../services/auth";
import { addMonster } from "../../db/monsters/services/addMonster";

const router = Router();

router.post("/", auth, async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            handleError(res, 403, "You must be logged in to create a new monster");
        } else {
            const monster = await addMonster(req.body);
            res.send(monster);
        }
    } catch (err) {
        catchError(res, err);
    }
});

export { router as monsterCodexRouter };