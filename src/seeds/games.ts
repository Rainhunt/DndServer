import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import { GameModel } from "../db/games/schema/games";
import { MapModel } from "../db/maps/schema/maps";
import { Types } from "mongoose";
import { CreateGameInput, createGame } from "../db/games/services/crud";
import { CreateMapInput, createMap } from "../db/maps/services/crud";
import { IUser } from "../db/users/schema/User";

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

        // 2. Clear existing games and maps to avoid duplicates during reseeding
        await GameModel.deleteMany({});
        await MapModel.deleteMany({});
        console.log(chalk.gray("Cleared existing games and maps."));

        // 3. Create a sample map
        const sampleMapData: CreateMapInput = {
            name: "Starter Town Map",
            tmxFile: tmxContent,
            revealedTo: [adminUser._id],
        };

        const createdMap = await createMap(sampleMapData);
        console.log(chalk.green(`Created map: ${createdMap.name} (ID: ${createdMap._id})`));

        // 4. Create a sample game
        const sampleGameData: CreateGameInput = {
            name: "My First Adventure",
            owner: adminUser._id,
            gameDMs: [adminUser._id],
            players: [],
            maps: [createdMap._id],
            gameAdmins: [adminUser._id],
            config: {},
        };

        const createdGame = await createGame(sampleGameData);
        console.log(chalk.green(`Created game: ${createdGame.name} (ID: ${createdGame._id})`));

        // 5. Associate the game with the admin user, if not already associated
        const gameId = createdGame._id as Types.ObjectId;

        if (!adminUser.games.some(g => g.equals(gameId))) {
            adminUser.games.push(gameId);
            await adminUser.save({ validateBeforeSave: false });
            console.log(chalk.green(`Associated game "${createdGame.name}" with admin user "${adminUser.email}".`));
        } else {
            console.log(chalk.yellow(`Game "${createdGame.name}" is already associated with admin user "${adminUser.email}".`));
        }

        console.log(chalk.blueBright("Successfully seeded games and maps."));

    } catch (error) {
        console.error(chalk.red("Error seeding games and maps:"), error);
    }
};

export default seedGamesAndMaps;
