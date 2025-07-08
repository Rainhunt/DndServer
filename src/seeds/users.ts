import "dotenv/config";
import chalk from "chalk";
import User, { IUser } from "../db/users/schema/User";
import { registerUser } from "../db/users/services/crud";
const adminMail = process.env.ADMIN_MAIL || "adminmail@mail.com";
const adminPass = process.env.ADMIN_PASS || "aB1!padtoEight";

const users: any = [
    {
        name: {
            first: "John",
            last: "Doe"
        },
        username: "Johnzo",
        email: adminMail,
        password: adminPass,
        isAdmin: true
    },
    {
        name: {
            first: "Elizabeth",
            middle: "Middle Name",
            last: "Smith"

        },
        username: "Elizabot",
        email: "example@gmail.com",
        password: "StrongPass123!",
    },
    {
        name: {
            first: "Another",
            last: "User"
        },
        username: "Another1",
        email: "test@example.com",
        password: "StrongPass123!",
    }
]

export default async function seedUsers(): Promise<IUser | undefined> {
    try {
        let admin: IUser | undefined;
        for (const user of users) {
            try {
                const existing = await User.findOne({ email: user.email });
                if (existing) {
                    console.log(chalk.yellow(`Skipped existing user: ${user.email}`));
                    admin ||= existing;
                    continue;
                }

                const newUser = await registerUser(user);
                console.log(chalk.green(`Created user: ${newUser.email}`));
                admin ||= newUser;
            } catch (err) {
                console.log(chalk.redBright(`Failed to add ${user.email}: ${(err as Error).message}`));
            }
        }

        if (admin) {
            return admin; // ✅ return full IUser instead of admin._id
        } else {
            console.log(chalk.redBright(`Mongoose Error: Failed to create admin`));
        }
    } catch (err) {
        const error = err as Error;
        console.log(chalk.redBright(`Mongoose Error: ${error.message}`));
    }
}
