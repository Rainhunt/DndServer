import { Request, Response, Router } from "express";
import handleError, { catchError } from "../../errors/handleError";
import { validateRegistrationBody } from "./requestValidators";
import { registerUser } from "../../db/users/services/registerUser";
import _ from "lodash";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
    try {
        const schemaError = validateRegistrationBody(req.body);
        if (schemaError) {
            handleError(res, 400, schemaError);
        } else {
            const user = await registerUser(req.body);
            res.send(_.pick(user, ["name", "email", "_id"]));
        }
    } catch (err) {
        console.log("here 2");
        catchError(res, err);
    }
});

export { router as userRouter };