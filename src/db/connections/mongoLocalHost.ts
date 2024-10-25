import "dotenv/config";
import chalk from "chalk";
import { connect } from "mongoose";

export default async function connectToMongoLocalHost() {
    try {
        if (process.env.MONGO_LH_CONNECTION_STRING) {
            await connect(process.env.MONGO_LH_CONNECTION_STRING);
            console.log(chalk.greenBright("Connected to MongoDB locally"));
        } else {
            console.log(chalk.redBright("Mongo connection string undefined"));
        }
    } catch (err) {
        console.log(chalk.redBright("Could not connect to MongoDB"));
    }
}