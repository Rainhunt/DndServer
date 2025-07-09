// src/db/maps/services/crud.test.ts

// Mock the underlying CRUD operations.
jest.mock("../../crud/crudOperations", () => ({
    createEntity: jest.fn(),
    getEntity: jest.fn(),
    updateEntity: jest.fn(),
    deleteEntity: jest.fn(),
}));

import { CreateMapInput, createMap, getMaps, editMap, deleteMap } from "./crud";
import { MapModel, IMap } from "../schema/maps";
import {
    createEntity,
    getEntity,
    updateEntity,
    deleteEntity,
} from "../../crud/crudOperations";

describe("Map CRUD functions", () => {
    // A fake map object for testing.
    const fakeMap: IMap = ({
        _id: "mapId",
        name: "Test Map",
        tmxFile: "<xml>some-tmx</xml>",
        tilesets: "tileset1",
        revealedTo: ["userId"] as any,
    } as unknown) as IMap;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createMap", () => {
        it("should call createEntity and return the created map", async () => {
            (createEntity as jest.Mock).mockResolvedValue(fakeMap);

            const input: CreateMapInput = {
                name: fakeMap.name,
                tmxFile: fakeMap.tmxFile,
                tilesets: fakeMap.tilesets,
                revealedTo: fakeMap.revealedTo,
            };

            const result = await createMap(input);
            expect(createEntity).toHaveBeenCalledWith(MapModel, input);
            expect(result).toBe(fakeMap);
        });
    });

    describe("getMaps", () => {
        it("should return a single map when id is provided", async () => {
            (getEntity as jest.Mock).mockResolvedValue(fakeMap);

            const result = await getMaps("mapId");
            expect(getEntity).toHaveBeenCalledWith(MapModel, "mapId");
            expect(result).toBe(fakeMap);
        });

        it("should return an array of maps when id is not provided", async () => {
            const array = [
                fakeMap,
                { ...fakeMap, _id: "mapId2" } as unknown as IMap,
            ];
            (getEntity as jest.Mock).mockResolvedValue(array);

            const result = await getMaps();
            expect(getEntity).toHaveBeenCalledWith(MapModel, undefined);
            expect(result).toBe(array);
        });
    });

    describe("editMap", () => {
        it("should call updateEntity and return the updated map", async () => {
            const updatedMap = ({ ...fakeMap, name: "Updated Map" } as unknown) as IMap;
            (updateEntity as jest.Mock).mockResolvedValue(updatedMap);

            const updateData: Partial<IMap> = { name: "Updated Map" };
            const result = await editMap("mapId", updateData);

            expect(updateEntity).toHaveBeenCalledWith(MapModel, "mapId", updateData);
            expect(result).toBe(updatedMap);
        });
    });

    describe("deleteMap", () => {
        it("should call deleteEntity and return the deleted map", async () => {
            (deleteEntity as jest.Mock).mockResolvedValue(fakeMap);

            const result = await deleteMap("mapId");
            expect(deleteEntity).toHaveBeenCalledWith(MapModel, "mapId");
            expect(result).toBe(fakeMap);
        });
    });
});
