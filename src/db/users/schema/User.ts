import { Document, model, Schema, Types } from "mongoose";
import emailField from "../../schemas/EmailField";
import passwordField from "../../schemas/PasswordField";
import { compare, genSalt, hash } from "bcrypt";

export interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    profilePic?: string;
    lastAttempts: number[];
    games: Types.ObjectId[];
    validatePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
    },
    email: emailField,
    password: passwordField,
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    profilePic: {
        type: String,
        required: false,
    },
    lastAttempts: {
        type: [Number],
        required: true,
        default: [],
    },
    games: [
        {
            type: Schema.Types.ObjectId,
            ref: "Game",
            required: true,
        },
    ],
});

userSchema.pre<IUser>("save", async function () {
    if (this.isModified("password")) {
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
    }
});

userSchema.methods.validatePassword = async function (password: string) {
    return compare(password, this.password);
};

const User = model<IUser>("User", userSchema);
export default User;
