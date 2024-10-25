import { Request, Response, Router } from "express";
import handleError from "../errors/handleError";
import { userRouter } from "./users/userRoutes";
import { monsterCodexRouter } from "./monsterCodex/monsterCodexRoutes";

const router = Router();

router.use("/users", userRouter);
router.use("/monsters", monsterCodexRouter);

router.use((req: Request, res: Response) => {
    handleError(res, 404, "Path not found");
});

export default router;