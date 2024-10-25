import "dotenv/config";
import connectToMongoLocalHost from "../db/connections/mongoLocalHost";

const ENVIRONMENT = process.env.NODE_ENV;

export default async function connectToDB() {
    switch (ENVIRONMENT) {
        case "development":
        default:
            await connectToMongoLocalHost();
    }
}
