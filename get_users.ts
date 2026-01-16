
import { db } from "./server/db.js";
import { users } from "./shared/schema.js";

async function getUsers() {
    try {
        const allUsers = await db.select().from(users);
        console.log(JSON.stringify(allUsers, null, 2));
    } catch (err) {
        console.error(err);
    }
    process.exit(0);
}

getUsers();
