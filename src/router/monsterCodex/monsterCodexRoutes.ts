import { Request, Response, Router } from "express";
import handleError, { catchError } from "../../errors/handleError";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            handleError(res, 403, "You must be logged in to create a new monster");
        } else {
            res.status(200).send("Congratulations! You created a new monster!");
        }
    } catch (err) {
        catchError(res, err);
    }
});

export { router as monsterCodexRouter };