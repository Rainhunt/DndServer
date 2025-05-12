import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMap extends Document {
    name: string;
    xmlContent: string;
    tileImagePath?: string;
    revealedTo?: Types.ObjectId[];
}

const MapSchema: Schema = new Schema({
    name: { type: String, required: true },
    xmlContent: { type: String, required: true },
    tileImagePath: { type: String, required: false },
    revealedTo: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
});

export const MapModel = mongoose.model<IMap>("Map", MapSchema);
