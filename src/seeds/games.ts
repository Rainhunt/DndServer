import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import { GameModel, IGame } from "../db/games/schema/games";
import { MapModel, IMap } from "../db/maps/schema/maps";
import User, { IUser } from "../db/users/schema/User";
import { Types } from "mongoose";

const seedGamesAndMaps = async (adminUser: IUser): Promise<void> => {
    try {
        console.log(chalk.blue("Starting to seed games and maps..."));

        // 1. Read the sample TMX file
        const tmxPath = path.join(__dirname, "data", "maps", "sample_map.tmx");
        let tmxContent: string;
        try {
            tmxContent = await fs.readFile(tmxPath, "utf-8");
            console.log(chalk.gray("Successfully read sample_map.tmx"));
        } catch (error) {
            console.error(chalk.red("Error reading sample_map.tmx:"), error);
            return;
        }

        // Clear existing games and maps to avoid duplicates during reseeding
        await GameModel.deleteMany({});
        await MapModel.deleteMany({});
        console.log(chalk.gray("Cleared existing games and maps."));

        // 2. Create a sample map
        const sampleMapData: Partial<IMap> = {
            name: "Starter Town Map",
            tmxFile: tmxContent,
            gameDMs: [adminUser._id as Types.ObjectId],
            revealedTo: [adminUser._id as Types.ObjectId], // Reveal to admin by default
            // Other fields like spriteSheets can be added if necessary
        };
        const createdMap = await MapModel.create(sampleMapData);
        console.log(chalk.green(`Created map: ${createdMap.name} (ID: ${createdMap._id})`));

        // 3. Create a sample game
        const sampleGameData: Partial<IGame> = {
            title: "My First Adventure",
            gameDMs: [adminUser._id as Types.ObjectId],
            players: [], // Add player IDs if needed
            maps: [createdMap._id as Types.ObjectId],
            // previewImage can be added if available
        };
        const createdGame = await GameModel.create(sampleGameData);
        console.log(chalk.green(`Created game: ${createdGame.title} (ID: ${createdGame._id})`));

        // 4. Associate the game with the admin user
        if (adminUser.games) {
            adminUser.games.push(createdGame._id as Types.ObjectId);
        } else {
            adminUser.games = [createdGame._id as Types.ObjectId];
        }
        await adminUser.save();
        console.log(chalk.green(`Associated game "${createdGame.title}" with admin user "${adminUser.email}".`));

        console.log(chalk.blueBright("Successfully seeded games and maps."));

    } catch (error) {
        console.error(chalk.red("Error seeding games and maps:"), error);
    }
};

export default seedGamesAndMaps;
