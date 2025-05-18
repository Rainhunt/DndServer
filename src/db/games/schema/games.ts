import mongoose, { Schema, Document, Types } from "mongoose";

export interface IGame extends Document {
    name: string;
    owner: Types.ObjectId;
    maps: Types.ObjectId[];        // References Map documents
    players: Types.ObjectId[];
    gameAdmins: Types.ObjectId[];
    gameDMs: Types.ObjectId[];
    config: Object // TODO
}

const GameSchema: Schema = new Schema({
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    maps: [{ type: Schema.Types.ObjectId, ref: "Map" }],
    players: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    gameAdmins: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    gameDMs: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
});

export const GameModel = mongoose.model<IGame>("Game", GameSchema);
