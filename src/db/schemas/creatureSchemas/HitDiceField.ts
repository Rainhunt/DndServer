//SOON TO BE IMPLEMENTED

// import { Document, Schema } from "mongoose";
// import { DICE } from "../../../resources/srdEnums";

// export interface HitDie extends Document {
//     size: DICE;
//     source: string[];
//     quantity: number;
// }

// const hitDieField = new Schema<HitDie>({
//     size: {
//         type: String,
//         validate: {
//             validator: v => Object.values(DICE).includes(v)
//         }
//     }
// });

// hitDieField.virtual("quantity").get(function (this: HitDie): number {
//     return this.source.length;
// });

// export default hitDieField;