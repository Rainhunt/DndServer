// Mock the underlying CRUD operations.
jest.mock("../../crud/crudOperations", () => ({
  createEntity: jest.fn(),
  getEntity: jest.fn(),
  updateEntity: jest.fn(),
  deleteEntity: jest.fn(),
}));


// monstersCrud.test.ts
import { addMonster, getMonsters, editMonster, deleteMonster } from "./crud";
import Monster, { IMonster } from "../schema/Monster";
import {
  createEntity,
  getEntity,
  updateEntity,
  deleteEntity,
} from "../../crud/crudOperations";



describe("Monster CRUD functions", () => {
  // A fake monster object for testing.
  const fakeMonster: IMonster = {
    _id: "monsterId",
    name: "lich",
    biome: "crypt",
    CR: 21,
    size: "medium",
    type: "undead",
    alignment: "neutral-evil",
    // When a monster is fetched with an id, we expect it to have a toObject method.
    toObject: jest.fn().mockImplementation((options) =>
      // Merge in options (e.g. virtuals) to simulate computed properties.
      ({ _id: "monsterId", name: "lich", biome: "crypt", CR: 21, size: "medium", type: "undead", alignment: "neutral-evil", ...options })
    ),
  } as any; // Cast as any to simplify type requirements

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("addMonster", () => {
    it("should call createEntity and return the created monster", async () => {
      (createEntity as jest.Mock).mockResolvedValue(fakeMonster);
      const newMonster = {
        name: "lich",
        biome: "crypt",
        CR: 21,
        size: "medium",
        type: "undead",
        alignment: "neutral-evil",
      } as IMonster;

      const result = await addMonster(newMonster);
      expect(createEntity).toHaveBeenCalledWith(Monster, newMonster);
      expect(result).toBe(fakeMonster);
    });
  });

  describe("getMonsters", () => {
    it("should return a single monster with virtuals when id is provided", async () => {
      // Set up a fake monster that includes a toObject method.
      const fakeSingleMonster = {
        ...fakeMonster,
        toObject: jest.fn().mockReturnValue({
          _id: "monsterId",
          name: "lich",
          biome: "crypt",
          CR: 21,
          size: "medium",
          type: "undead",
          alignment: "neutral-evil",
          virtuals: true,
        }),
      };
      (getEntity as jest.Mock).mockResolvedValue(fakeSingleMonster);
      const result = await getMonsters("monsterId");
      expect(getEntity).toHaveBeenCalledWith(Monster, "monsterId");
      expect(fakeSingleMonster.toObject).toHaveBeenCalledWith({ virtuals: true });
      expect(result).toEqual({
        _id: "monsterId",
        name: "lich",
        biome: "crypt",
        CR: 21,
        size: "medium",
        type: "undead",
        alignment: "neutral-evil",
        virtuals: true,
      });
    });

    it("should return an array of monsters when id is not provided", async () => {
      const fakeMonstersArray = [
        fakeMonster,
        { ...fakeMonster, _id: "monsterId2" },
      ];
      (getEntity as jest.Mock).mockResolvedValue(fakeMonstersArray);
      const result = await getMonsters();
      expect(getEntity).toHaveBeenCalledWith(Monster, undefined);
      expect(result).toEqual(fakeMonstersArray);
    });
  });

  describe("editMonster", () => {
    it("should call updateEntity and return the updated monster", async () => {
      const updatedMonster = { ...fakeMonster, name: "updated lich" };
      (updateEntity as jest.Mock).mockResolvedValue(updatedMonster);
      const result = await editMonster("monsterId", updatedMonster);
      expect(updateEntity).toHaveBeenCalledWith(Monster, "monsterId", updatedMonster);
      expect(result).toBe(updatedMonster);
    });
  });

  describe("deleteMonster", () => {
    it("should call deleteEntity and return the deleted monster", async () => {
      (deleteEntity as jest.Mock).mockResolvedValue(fakeMonster);
      const result = await deleteMonster("monsterId");
      expect(deleteEntity).toHaveBeenCalledWith(Monster, "monsterId");
      expect(result).toBe(fakeMonster);
    });
  });
});
