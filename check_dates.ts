
import { db } from "./server/db.js";
import { accountsPayable, accountsReceivable } from "./shared/schema.js";

async function checkDates() {
    try {
        const ap = await db.select().from(accountsPayable).limit(5);
        const ar = await db.select().from(accountsReceivable).limit(5);
        console.log("Accounts Payable dueDates:", ap.map(a => a.dueDate));
        console.log("Accounts Receivable dueDates:", ar.map(a => a.dueDate));
    } catch (err) {
        console.error(err);
    }
    process.exit(0);
}

checkDates();
