import { createEntity, getEntity, updateEntity, deleteEntity } from "../../crud/crudOperations";
import User, { IUser } from "../schema/User";

export function registerUser(newUser: IUser): Promise<IUser> {
    return createEntity<IUser>(User, newUser);
}

export function getUsers(id?: string): Promise<IUser | IUser[]> {
    return getEntity<IUser>(User, id);
}

export function editUser(id: string, userInfo: IUser): Promise<IUser> {
    return updateEntity<IUser>(User, id, userInfo);
}

export function deleteUser(id: string): Promise<IUser> {
    return deleteEntity<IUser>(User, id);
}
