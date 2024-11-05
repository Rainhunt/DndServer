import { disconnect } from "mongoose";
import connectToDB from "../services/db";
import seedMonsters from "./monsters";

async function seedDB() {
    await connectToDB();
    await seedMonsters();
    disconnect();
}

seedDB();