// getMyMonsters.test.ts
import getMyMonsters from "./getMyMonsters";
import Monster, { IMonster } from "../schema/Monster";
import createError from "../../../errors/createError";

// Mock createError so that it throws an error with the provided message.
jest.mock("../../../errors/createError", () => {
  return jest.fn((type: string, message: string, status: number, err?: any) => {
    throw new Error(message);
  });
});

describe("getMyMonsters", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an array of monsters when a valid userId is provided", async () => {
    const fakeMonsters: IMonster[] = [
        ({
          _id: "1",
          name: "Monster One",
          biome: "crypt",
          CR: 10,
          size: "medium",
          type: "undead",
          alignment: "neutral-evil",
          createdBy: "userId",
        } as unknown) as IMonster,
        ({
          _id: "2",
          name: "Monster Two",
          biome: "crypt",
          CR: 5,
          size: "small",
          type: "undead",
          alignment: "neutral-evil",
          createdBy: "userId",
        } as unknown) as IMonster,
      ];

    // Override Monster.find to resolve with our fake monsters.
    (Monster.find as jest.Mock) = jest.fn().mockResolvedValue(fakeMonsters);

    const result = await getMyMonsters("userId");
    expect(Monster.find).toHaveBeenCalledWith({ createdBy: "userId" });
    expect(result).toEqual(fakeMonsters);
  });

  it("should throw a 'User not found' error when no userId is provided", async () => {
    await expect(getMyMonsters(undefined)).rejects.toThrow("User not found");
  });

  it("should throw an 'Internal Server Error' error if Monster.find rejects", async () => {
    (Monster.find as jest.Mock) = jest.fn().mockRejectedValue(new Error("Some error"));
    await expect(getMyMonsters("userId")).rejects.toThrow("Internal Server Error");
  });
});
