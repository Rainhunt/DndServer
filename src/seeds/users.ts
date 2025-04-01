import "dotenv/config";
import chalk from "chalk";
import { IUser } from "../db/users/schema/User";
import { registerUser } from "../db/users/services/crud";
const adminMail = process.env.ADMIN_MAIL || "adminmail@mail.com";
const adminPass = process.env.ADMIN_PASS || "aB1!padtoEight";

const users: any = [
    {
        name: {
            first: "John",
            last: "Doe"
        },
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
        email: "example@gmail.com",
        password: "123!Abcd",
    },
    {
        name: {
            first: "Another",
            last: "User"
        },
        email: "test@example.com",
        password: "123!Abcd",
    }
]

export default async function seedUsers(): Promise<string | undefined> {
    try {
        let admin: IUser | undefined
        for (const user of users) {
            try {
                const newUser = await registerUser(user);
                admin ||= newUser;
            } catch (err) {
                const error = err as Error
                console.log(chalk.redBright(`Failed to add ${user.email}: ${error.message}`));
            }
        }
        if (admin) {
            return admin._id as string
        } else {
            console.log(chalk.redBright(`Mongoose Error: Failed to create admin`));
        }
    } catch (err) {
        const error = err as Error
        console.log(chalk.redBright(`Mongoose Error: ${error.message}`));
    }
}