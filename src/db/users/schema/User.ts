import { Document, model, Schema } from "mongoose";
import nameField, { NameField } from "../../schemas/NameField";
import emailField from "../../schemas/EmailField";
import passwordField from "../../schemas/PasswordField";
import { compare, genSalt, hash } from "bcrypt";

export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    isAdmin: boolean,
    profilePic?: string, // Optional profile picture field
    validatePassword: (password: string) => Promise<boolean>;
    lastAttempts: Array<number>
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    email: emailField,
    password: passwordField,
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    profilePic: { 
        type: String, 
        required: false  // This field is optional
    },
    lastAttempts: {
        type: [Number],
        required: true,
        default: []
    }
});

userSchema.pre<IUser>("save", async function () {
    if (this.isModified("password")) {
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
    }
    next();
});

userSchema.methods.validatePassword = async function (password: string) {
    return compare(password, this.password);
}

const User = model<IUser>("User", userSchema);
export default User;
