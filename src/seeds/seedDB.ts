import { disconnect } from "mongoose";
import connectToDB from "../services/db";
import seedMonsters from "./monsters";
import seedUsers from "./users";
import seedGamesAndMaps from "./games"; // Import the new seeder
import chalk from "chalk";

async function seedDB() {
    await connectToDB();
    let admin = await seedUsers();
    if (admin) {
        await seedMonsters(admin);
        await seedGamesAndMaps(admin); // Call the new seeder
    } else {
        console.log(chalk.redBright("Failed to seed monsters and games: failed to seed admin user"));
    }
    disconnect();
}

seedDB();