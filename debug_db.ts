
import { db } from "./server/db.js";
import { accountsPayable } from "./shared/schema.js";
import { sql } from "drizzle-orm";

async function debug() {
    try {
        const result = await db.execute(sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'accounts_payable'
    `);
        console.log("Columns in accounts_payable:");
        console.table(result.rows);

        const count = await db.select({ count: sql`count(*)` }).from(accountsPayable);
        console.log("Total accounts:", count[0].count);
    } catch (err) {
        console.error("Debug error:", err);
    }
    process.exit(0);
}

debug();
