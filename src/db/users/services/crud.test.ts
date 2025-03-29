
jest.mock("../../crud/crudOperations", () => ({
  __esModule: true,
  createEntity: jest.fn(),
  getEntity: jest.fn(),
  updateEntity: jest.fn(),
  deleteEntity: jest.fn(),
}));

// usersCrud.test.ts
import { registerUser, getUsers, editUser, deleteUser } from "./crud";
import User, { IUser } from "../schema/User";

import {
  createEntity,
  getEntity,
  updateEntity,
  deleteEntity,
} from "../../crud/crudOperations";



describe("User CRUD functions", () => {
  // Define a fake user object.
  const fakeUser: IUser = ({
    _id: "fakeUserId",
    name: { first: "John", last: "Doe" },
    email: "john@example.com",
    password: "hashedpassword",
    isAdmin: false,
    validatePassword: jest.fn().mockResolvedValue(true),
    lastAttempts: [],
  } as unknown) as IUser;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    it("should call createEntity and return the created user", async () => {
      (createEntity as jest.Mock).mockResolvedValue(fakeUser);

      const newUser = ({
        name: { first: "John", last: "Doe" },
        email: "john@example.com",
        password: "hashedpassword",
        isAdmin: false,
        lastAttempts: [],
      } as unknown) as IUser;
      

      const result = await registerUser(newUser);
      expect(createEntity).toHaveBeenCalledWith(User, newUser);
      expect(result).toEqual(fakeUser);
    });
  });

  describe("getUsers", () => {
    it("should call getEntity with id and return a single user", async () => {
      (getEntity as jest.Mock).mockResolvedValue(fakeUser);
      const result = await getUsers("fakeUserId");
      expect(getEntity).toHaveBeenCalledWith(User, "fakeUserId");
      expect(result).toEqual(fakeUser);
    });

    it("should call getEntity without id and return an array of users", async () => {
      const fakeUsersArray: IUser[] = [
        fakeUser,
        ({ ...fakeUser, _id: "anotherId" } as unknown) as IUser,
      ];
      (getEntity as jest.Mock).mockResolvedValue(fakeUsersArray);
      const result = await getUsers();
      expect(getEntity).toHaveBeenCalledWith(User, undefined);
      expect(result).toEqual(fakeUsersArray);
    });
  });

  describe("editUser", () => {
    it("should call updateEntity with the correct arguments and return the updated user", async () => {
      const updatedUser = ({ ...fakeUser, email: "new@example.com" } as unknown) as IUser;
      (updateEntity as jest.Mock).mockResolvedValue(updatedUser);
      const result = await editUser("fakeUserId", updatedUser);
      expect(updateEntity).toHaveBeenCalledWith(User, "fakeUserId", updatedUser);
      expect(result).toEqual(updatedUser);
    });
  });
  

  describe("deleteUser", () => {
    it("should call deleteEntity with the correct id and return the deleted user", async () => {
      (deleteEntity as jest.Mock).mockResolvedValue(fakeUser);
      const result = await deleteUser("fakeUserId");
      expect(deleteEntity).toHaveBeenCalledWith(User, "fakeUserId");
      expect(result).toEqual(fakeUser);
    });
  });
});
