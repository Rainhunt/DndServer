import { Request, Response, Router } from "express";
import handleError from "../errors/handleError";
import { ServerError } from "../errors/createError";

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
        if (err instanceof ServerError) {
            handleError(res, err.status || 400, err.message);
        } else {
            const error = err as Error;
            handleError(res, 400, error.message);
        }
    }
});

export { router as monsterCodexRouter };