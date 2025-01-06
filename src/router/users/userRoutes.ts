import { Request, Response, Router } from "express";
import handleError, { catchError } from "../../errors/handleError";
import { validateEditUserBody, validateLoginBody, validateRegistrationBody } from "./requestValidators";
import { registerUser } from "../../db/users/services/registerUser";
import _ from "lodash";
import { loginUser } from "../../db/users/services/loginUser";
import auth from "../../services/auth";
import createError from "../../errors/createError";
import getUsers from "../../db/users/services/getUsers";
import { IUser } from "../../db/users/schema/User";
import editUser from "../../db/users/services/editUser";
import deleteUser from "../../db/users/services/deleteUser";

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
        catchError(res, err);
    }
});

router.post("/login", async (req: Request, res: Response) => {
    try {
        const token = await loginUser(req.body.email, req.body.password);
        res.send(token);
    } catch (err) {
        catchError(res, err);
    }
});

router.get("/:id", auth, async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const { id } = req.params;
        if (!user || (user._id !== id && !user.isAdmin)) {
            createError("Authorization", "You do not have permission to access this profile", 403);
        } else {
            const user = await getUsers(id) as IUser;
            res.send(_.pick(user, ["name", "email", "_id"]));
        }
    } catch (err) {
        catchError(res, err);
    }
});

router.get("/", auth, async (req: Request, res: Response) => {
    try {
        const user = req.user
        if (!user?.isAdmin) {
            createError("Authorization", "You do not have permission to access this information", 403);
        } else {
            const users = await getUsers() as IUser[];
            res.send(users.map((user) => _.pick(user, ["_id", "name", "email"])));
        }
    } catch (err) {
        catchError(res, err);
    }
});

router.put("/:id", auth, async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const { id } = req.params
        if (!user || (user._id !== id && !user.isAdmin)) {
            createError("Authorization", "You do not have permission to edit this profile", 403);
        } else {
            const schemaError = validateEditUserBody(req.body);
            if (schemaError) {
                handleError(res, 400, schemaError);
            } else {
                const updated = await editUser(id, req.body);
                res.send(_.pick(updated, ["name", "email", "_id"]));
            }
        }
    } catch (err) {
        catchError(res, err)
    }
});

router.delete("/:id", auth, async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const { id } = req.params
        if (!user || (user._id !== id && !user.isAdmin)) {
            createError("Authorization", "You do not have permission to delete this profile", 403);
        } else {
            const deleted = await deleteUser(id);
            res.send(_.pick(deleted, ["name", "email", "_id"]));
        }
    } catch (err) {
        catchError(res, err)
    }
});

export { router as userRouter };