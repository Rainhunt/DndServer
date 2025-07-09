import { createEntity, getEntity, updateEntity, deleteEntity } from "../../crud/crudOperations";
import { MapModel, IMap } from "../schema/maps";
import { Types } from "mongoose";

// Type for map creation input (no _id, no methods)
export type CreateMapInput = Pick<IMap, "name" | "tmxFile"> & Partial<Pick<IMap, "tilesets" | "revealedTo">>;

// Create a map
export function createMap(newMap: CreateMapInput): Promise<IMap> {
    return createEntity<IMap, CreateMapInput>(MapModel, newMap);
}

// Get a map by ID or all maps
export function getMaps(id?: string): Promise<IMap | IMap[]> {
    return getEntity<IMap>(MapModel, id);
}

// Update a map by ID
export function editMap(id: string, mapData: Partial<IMap>): Promise<IMap> {
    return updateEntity<IMap>(MapModel, id, mapData);
}

// Delete a map by ID
export function deleteMap(id: string): Promise<IMap> {
    return deleteEntity<IMap>(MapModel, id);
}
