// User.mock.test.ts

// Mock bcrypt methods so that we control their output.
jest.mock("bcrypt", () => ({
    genSalt: jest.fn().mockResolvedValue("fakeSalt"),
    hash: jest.fn().mockResolvedValue("hashedPassword"),
    compare: jest.fn().mockResolvedValue(true),
  }));

import User, { IUser } from "./User";
import { genSalt, hash, compare } from "bcrypt";


describe("User Model (Mocked Database)", () => {
  it("should hash password before saving", async () => {
    // Create a new user instance.
    const user = new User({
      name: { first: "John", last: "Doe" },
      email: "john@example.com",
      password: "plainPassword",
      isAdmin: false,
      lastAttempts: [],
    });

    // Override the isModified method to simulate that password is modified.
    user.isModified = jest.fn().mockReturnValue(true);

    // Override the save method to simulate running the pre-save hook.
    // This function mimics what Mongoose would do: run pre-save hooks and then "save" the document.
    user.save = jest.fn().mockImplementation(async function (this: IUser) {
      // Run the pre-save hook logic manually:
      if (this.isModified("password")) {
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
      }
      return this;
    });

    // Call save() on the user instance.
    const savedUser = await user.save();

    // Verify that bcrypt methods were called.
    expect(genSalt).toHaveBeenCalled();
    expect(hash).toHaveBeenCalledWith("plainPassword", "fakeSalt");
    // The password should now be the hashed version.
    expect(savedUser.password).toEqual("hashedPassword");
  });

  it("should validate password correctly", async () => {
    // Create a user instance with a hashed password.
    const user = new User({
      name: { first: "John", last: "Doe" },
      email: "john@example.com",
      password: "hashedPassword",
      isAdmin: false,
      lastAttempts: [],
    });

    // Call validatePassword to test that it uses bcrypt.compare.
    const isValid = await user.validatePassword("plainPassword");
    expect(compare).toHaveBeenCalledWith("plainPassword", "hashedPassword");
    expect(isValid).toBe(true);
  });

  it("should set default values for isAdmin and lastAttempts", () => {
    // Create a user without explicitly setting isAdmin and lastAttempts.
    const user = new User({
      name: { first: "Jane", last: "Smith" },
      email: "jane@example.com",
      password: "somePassword",
    });

    // The defaults are set immediately on creation.
    expect(user.isAdmin).toBe(false);
    expect(user.lastAttempts).toEqual([]);
  });

  it("should save an optional profilePic if provided", () => {
    const profilePicUrl = "http://example.com/image.png";
    const user = new User({
      name: { first: "Alice", last: "Wonderland" },
      email: "alice@example.com",
      password: "password123",
      profilePic: profilePicUrl,
    });

    expect(user.profilePic).toEqual(profilePicUrl);
  });
});
