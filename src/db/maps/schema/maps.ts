import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMap extends Document {
    _id: Types.ObjectId;
    name: string;
    tmxFile: string;
    tilesets?: string; //TODO array that must contain at least one tileset object - which MIGHT include a source, but MUST contain one image
    revealedTo?: Types.ObjectId[];
}

const MapSchema: Schema = new Schema({
    name: { type: String, required: true },
    tmxFile: { type: String, required: true },
    tilesets: { type: String, required: false },
    revealedTo: [{ type: Schema.Types.ObjectId, ref: "Player", required: false }],
});

export const MapModel = mongoose.model<IMap>("Map", MapSchema);
