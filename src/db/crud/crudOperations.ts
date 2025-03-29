import { Model, Document, UpdateQuery } from "mongoose";
import createError from "../../errors/createError";

// Generic Create function
export async function createEntity<T extends Document>(
  model: Model<T>,
  newEntity: Partial<T>
): Promise<T> {
  try {
    let entity: T = new model(newEntity);
    entity = await entity.save();
    return entity;
  } catch (err) {
    if (err instanceof Error) {
      createError("Mongoose", err.message, 409);
    } else {
      createError("Mongoose", "unknown error", 500);
    }
  }
}

export async function getEntity<T extends Document>(
  model: Model<T>,
  id?: string
): Promise<T | T[]> {
  try {
    if (id) {
      const entity = await model.findById(id);
      if (entity) {
        return entity;
      } else {
        // Throw the error so it can be caught below.
        throw createError("Mongoose", "Entity not found", 404);
      }
    } else {
      return await model.find();
    }
  } catch (err) {
    // If the error message is already "Entity not found", rethrow it.
    if (err instanceof Error && err.message === "Entity not found") {
      throw err;
    }
    // Otherwise, throw a more generic internal error.
    throw createError("Mongoose", "Internal Server Error", 500, err);
  }
}

export async function updateEntity<T extends Document>(
  model: Model<T>,
  id: string,
  data: UpdateQuery<T>
): Promise<T> {
  try {
    const updated = await model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!updated) {
      throw createError("Mongoose", "Entity not found", 404);
    }
    return updated;
  } catch (err) {
    if (err instanceof Error && err.message === "Entity not found") {
      throw err;
    }
    throw createError("Mongoose", "Internal Server Error", 500, err);
  }
}

export async function deleteEntity<T extends Document>(
  model: Model<T>,
  id: string
): Promise<T> {
  try {
    const deleted = await model.findByIdAndDelete(id);
    if (!deleted) {
      throw createError("Mongoose", "Entity not found", 404);
    }
    return deleted;
  } catch (err) {
    if (err instanceof Error && err.message === "Entity not found") {
      throw err;
    }
    throw createError("Mongoose", "Internal Server Error", 500, err);
  }
}