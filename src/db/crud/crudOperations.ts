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

// Generic Read function
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
        createError("Mongoose", "Entity not found", 404);
      }
    } else {
      return await model.find();
    }
  } catch (err) {
    createError("Mongoose", "Internal Server Error", 500, err);
  }
}

// Generic Update function
export async function updateEntity<T extends Document>(
  model: Model<T>,
  id: string,
  data: UpdateQuery<T>
): Promise<T> {
  try {
    const updated = await model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!updated) {
      createError("Mongoose", "Entity not found", 404);
    } else {
      return updated;
    }
  } catch (err) {
    createError("Mongoose", "Internal Server Error", 500, err);
  }
}

// Generic Delete function
export async function deleteEntity<T extends Document>(
  model: Model<T>,
  id: string
): Promise<T> {
  try {
    const deleted = await model.findByIdAndDelete(id);
    if (!deleted) {
      createError("Mongoose", "Entity not found", 404);
    } else {
      return deleted;
    }
  } catch (err) {
    createError("Mongoose", "Internal Server Error", 500, err);
  }
}
