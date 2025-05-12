// crudOperations.test.ts
import { Model, Document, UpdateQuery } from "mongoose";
import {
  createEntity,
  getEntity,
  updateEntity,
  deleteEntity,
} from "./crudOperations";
import createError from "../../errors/createError";

// Define a simple interface for our fake document.
interface FakeDoc extends Document {
  data: any;
}

// Create a fake model class to simulate Mongoose behavior.
class FakeModel {
  data: any;
  _id: string;
  constructor(newEntity: Partial<FakeDoc>) {
    this.data = newEntity.data;
    // Simulate an _id generation.
    this._id = "fakeId";
  }
  async save(): Promise<FakeDoc> {
    return ({ ...this, data: this.data, _id: this._id } as unknown) as FakeDoc;
  }
  
  // Static methods to simulate queries.
  static findById = jest.fn();
  static find = jest.fn();
  static findByIdAndUpdate = jest.fn();
  static findByIdAndDelete = jest.fn();
}

// Since our generic functions expect a Model, we cast our FakeModel accordingly.
const FakeModelAsModel = FakeModel as unknown as Model<FakeDoc>;

// Mock createError so that it throws an error with the provided message.
jest.mock("../../errors/createError", () => {
  return jest.fn((type: string, message: string, status: number, err?: any) => {
    throw new Error(message);
  });
});

describe("CRUD Operations", () => {
  beforeEach(() => {
    // Reset all mocks before each test.
    jest.clearAllMocks();
  });

  describe("createEntity", () => {
    it("should create a new entity and return it", async () => {
      const newEntity = { data: "test data" } as FakeDoc;
      const result = await createEntity<FakeDoc>(FakeModelAsModel, newEntity);
      expect(result).toHaveProperty("_id", "fakeId");
      expect(result.data).toBe("test data");
    });

    it("should throw an error if save fails", async () => {
      // Create a fake model that throws when save() is called.
      class FailingModel {
        data: any;
        constructor(newEntity: Partial<FakeDoc>) {
          this.data = newEntity.data;
        }
        async save(): Promise<FakeDoc> {
          throw new Error("Save failed");
        }
      }
      const FailingModelAsModel = FailingModel as unknown as Model<FakeDoc>;
      await expect(
        createEntity<FakeDoc>(FailingModelAsModel, { data: "bad" } as FakeDoc)
      ).rejects.toThrow("Save failed");
    });
  });

  describe("getEntity", () => {
    it("should return a single entity when id is provided", async () => {
      const fakeDoc = {
        _id: "fakeId",
        data: "test data",
        toObject: () => ({ _id: "fakeId", data: "test data", virtual: "value" }),
      };
      (FakeModel.findById as jest.Mock).mockResolvedValue(fakeDoc);

      const result = await getEntity<FakeDoc>(FakeModelAsModel, "fakeId");
      expect(result).toBe(fakeDoc);
      expect(FakeModel.findById).toHaveBeenCalledWith("fakeId");
    });

    it("should return an array of entities when id is not provided", async () => {
      const fakeDocs = [
        { _id: "1", data: "data1" },
        { _id: "2", data: "data2" },
      ];
      (FakeModel.find as jest.Mock).mockResolvedValue(fakeDocs);

      const result = await getEntity<FakeDoc>(FakeModelAsModel);
      expect(result).toEqual(fakeDocs);
      expect(FakeModel.find).toHaveBeenCalled();
    });

    it("should throw an error if entity is not found", async () => {
      (FakeModel.findById as jest.Mock).mockResolvedValue(null);
      await expect(
        getEntity<FakeDoc>(FakeModelAsModel, "nonexistent")
      ).rejects.toThrow("Entity not found");
    });
  });

  describe("updateEntity", () => {
    it("should update an entity and return the updated entity", async () => {
      const updatedDoc = {
        _id: "fakeId",
        data: "updated data",
        toObject: () => ({ _id: "fakeId", data: "updated data" }),
      };
      (FakeModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedDoc);

      const result = await updateEntity<FakeDoc>(
        FakeModelAsModel,
        "fakeId",
        { data: "updated data" } as UpdateQuery<FakeDoc>
      );
      expect(result).toBe(updatedDoc);
      expect(FakeModel.findByIdAndUpdate).toHaveBeenCalledWith(
        "fakeId",
        { data: "updated data" },
        { new: true, runValidators: true }
      );
    });

    it("should throw an error if no entity is found to update", async () => {
      (FakeModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
      await expect(
        updateEntity<FakeDoc>(FakeModelAsModel, "nonexistent", { data: "update" } as UpdateQuery<FakeDoc>)
      ).rejects.toThrow("Entity not found");
    });
  });

  describe("deleteEntity", () => {
    it("should delete an entity and return it", async () => {
      const deletedDoc = {
        _id: "fakeId",
        data: "to be deleted",
        toObject: () => ({ _id: "fakeId", data: "to be deleted" }),
      };
      (FakeModel.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedDoc);

      const result = await deleteEntity<FakeDoc>(FakeModelAsModel, "fakeId");
      expect(result).toBe(deletedDoc);
      expect(FakeModel.findByIdAndDelete).toHaveBeenCalledWith("fakeId");
    });

    it("should throw an error if no entity is found to delete", async () => {
      (FakeModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
      await expect(
        deleteEntity<FakeDoc>(FakeModelAsModel, "nonexistent")
      ).rejects.toThrow("Entity not found");
    });
  });
});
