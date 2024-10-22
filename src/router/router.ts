import { Request, Response, Router } from "express";
import handleError from "../errors/handleError";
import { monsterCodexRouter } from "./monsterCodexRoutes";

const router = Router();

router.use("/monsters", monsterCodexRouter);

router.use((req: Request, res: Response) => {
    handleError(res, 404, "Path not found");
});

export default router;