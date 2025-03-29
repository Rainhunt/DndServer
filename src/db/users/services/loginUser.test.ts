// loginUser.test.ts
// Mock createError so it throws an error with the provided message.
jest.mock("../../../errors/createError", () => {
    return jest.fn((type: string, message: string, status: number, err?: any) => {
      throw new Error(message);
    });
  });

// Mock tokenGenerator to return a fixed token.
jest.mock("../../../services/auth", () => ({
    tokenGenerator: jest.fn(),
  }));

import { loginUser } from "./loginUser";
import User, { IUser } from "../schema/User";
import createError from "../../../errors/createError";
import { tokenGenerator } from "../../../services/auth";




describe("loginUser", () => {
  let fakeUser: IUser;

  beforeEach(() => {
    // Reinitialize fakeUser for each test.
    fakeUser = ({
      _id: "userId",
      name: { first: "John", last: "Doe" },
      email: "john@example.com",
      password: "hashedpassword",
      isAdmin: false,
      lastAttempts: [],
      validatePassword: jest.fn(),
    } as unknown) as IUser;

    jest.clearAllMocks();
  });

  it("should return a token when email and password are valid and login attempts are within limit", async () => {
    (User.findOne as jest.Mock) = jest.fn().mockResolvedValue(fakeUser);
    (User.updateOne as jest.Mock) = jest.fn().mockResolvedValue({});
    // Simulate valid password.
    (fakeUser.validatePassword as jest.Mock).mockResolvedValue(true);
    (tokenGenerator as jest.Mock).mockReturnValue("token123");

    const result = await loginUser("john@example.com", "correctpassword");

    // Expect that after a successful login, login attempts are cleared.
    expect(User.updateOne).toHaveBeenCalledWith(
      { email: "john@example.com" },
      { $set: { lastAttempts: [] } }
    );
    expect(tokenGenerator).toHaveBeenCalledWith(fakeUser);
    expect(result).toBe("token123");
  });

  it("should throw an 'Invalid email or password' error if no user is found", async () => {
    (User.findOne as jest.Mock) = jest.fn().mockResolvedValue(null);
    await expect(
      loginUser("nonexistent@example.com", "anyPassword")
    ).rejects.toThrow("Invalid email or password");
  });

  it("should throw an 'Invalid email or password' error if password is invalid", async () => {
    (User.findOne as jest.Mock) = jest.fn().mockResolvedValue(fakeUser);
    (User.updateOne as jest.Mock) = jest.fn().mockResolvedValue({});
    // Simulate invalid password.
    (fakeUser.validatePassword as jest.Mock).mockResolvedValue(false);

    await expect(
      loginUser("john@example.com", "wrongpassword")
    ).rejects.toThrow("Invalid email or password");
  });

  it("should throw a 'Too many login attempts. Please try again later.' error when login attempts exceed limit", async () => {
    // Pre-populate lastAttempts with three recent attempts.
    const now = new Date().getTime();
    fakeUser.lastAttempts = [now - 1000, now - 2000, now - 3000];
    (User.findOne as jest.Mock) = jest.fn().mockResolvedValue(fakeUser);
    (User.updateOne as jest.Mock) = jest.fn().mockResolvedValue({});
    (fakeUser.validatePassword as jest.Mock).mockResolvedValue(true);

    await expect(
      loginUser("john@example.com", "correctpassword")
    ).rejects.toThrow("Too many login attempts. Please try again later.");
  });

  it("should throw a 'Failed to log in user' error if User.updateOne rejects during reset", async () => {
    // Set up a scenario where the user is found and password is valid,
    // but the second updateOne (resetting attempts) rejects.
    (User.findOne as jest.Mock) = jest.fn().mockResolvedValue(fakeUser);
    // First updateOne (for login attempts) resolves.
    (User.updateOne as jest.Mock)
      .mockResolvedValueOnce({})
      // Second updateOne (reset attempts) rejects.
      .mockRejectedValueOnce(new Error("Update failed"));
    (fakeUser.validatePassword as jest.Mock).mockResolvedValue(true);

    await expect(
      loginUser("john@example.com", "correctpassword")
    ).rejects.toThrow("Failed to log in user");
  });
});
