import { disconnect } from "mongoose";
import connectToDB from "../services/db";
import seedMonsters from "./monsters";
import seedUsers from "./users";
import chalk from "chalk";

async function seedDB() {
    await connectToDB();
    let admin = await seedUsers();
    if (admin) {
        await seedMonsters(admin);
    } else {
        console.log(chalk.redBright("Failed to seed monsters: failed to seed admin user"));
    }
    disconnect();
}

seedDB();