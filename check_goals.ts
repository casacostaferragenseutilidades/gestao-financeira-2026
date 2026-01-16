
import { db } from "./server/db.js";
import { financialGoals } from "./shared/schema.js";

async function checkGoals() {
    try {
        const goals = await db.select().from(financialGoals);
        console.log("Current Financial Goals in DB:");
        console.log(JSON.stringify(goals, null, 2));
    } catch (err) {
        console.error("Error checking goals:", err);
    }
    process.exit(0);
}

checkGoals();
