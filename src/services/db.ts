import "dotenv/config";
import connectToMongoLocalHost from "../db/connections/mongoLocalHost";
import connectToMongoAtlas from "../db/connections/mongoAtlas";

const ENVIRONMENT = process.env.NODE_ENV;

export default async function connectToDB() {
    switch (ENVIRONMENT) {
        case "production":
            await connectToMongoAtlas();
            break;
        case "development":
        default:
            await connectToMongoLocalHost();
    }
}
