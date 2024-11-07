import { Document, model, Schema } from "mongoose";
import nameField, { NameField } from "../../schemas/NameField";
import emailField from "../../schemas/EmailField";
import passwordField from "../../schemas/PasswordField";
import { compare, genSalt, hash } from "bcrypt";

export interface IUser extends Document {
    name: NameField,
    email: string,
    password: string,
    isAdmin: boolean,
    validatePassword: (password: string) => Promise<boolean>;
    lastAttempts: Array<number>
}

const userSchema = new Schema<IUser>({
    name: nameField,
    email: emailField,
    password: passwordField,
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    lastAttempts: {
        type: [Number],
        required: true,
        default: []
    }
});

userSchema.pre<IUser>("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
    }
});

userSchema.methods.validatePassword = async function (password: string) {
    return compare(password, this.password);
}

const User = model<IUser>("User", userSchema);
export default User;