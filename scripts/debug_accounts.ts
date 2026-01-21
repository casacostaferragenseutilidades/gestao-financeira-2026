
import "dotenv/config";
import { db } from "../server/db";
import { accountsPayable, companies } from "../shared/schema";
import { eq } from "drizzle-orm";

async function debugAccounts() {
    console.log("Fetching companies...");
    const allCompanies = await db.select().from(companies);
    console.log("Companies found:", allCompanies.map(c => ({ id: c.id, name: c.nome })));

    console.log("\nFetching accounts payable count per company...");

    for (const company of allCompanies) {
        const accounts = await db.select().from(accountsPayable).where(eq(accountsPayable.companyId, company.id));
        console.log(`Company: ${company.nome} (${company.id}) - Count: ${accounts.length}`);
        if (accounts.length > 0) {
            console.log(`First 3 accounts for ${company.nome}:`);
            accounts.slice(0, 3).forEach(a => console.log(` - ${a.description} (ID: ${a.id}, Status: ${a.status})`));
        }
    }

    const unlinkedAccounts = await db.select().from(accountsPayable).where(eq(accountsPayable.companyId, ''));
    // Note: Drizzle/Postgres empty string check might not catch nulls depending on schema default. 
    // Ideally check for null, but schema might have made it text.
    // Let's check for nulls if possible, or just log all and inspect grouping manually if needed.
    // But Drizzle `eq` with null might be tricky. Let's filter in JS for unlinked.

    const allAccounts = await db.select().from(accountsPayable);
    const unlinked = allAccounts.filter(a => !a.companyId);
    console.log(`\nUnlinked or Null Company Accounts: ${unlinked.length}`);
    if (unlinked.length > 0) {
        unlinked.slice(0, 5).forEach(a => console.log(` - ${a.description} (ID: ${a.id})`));
    }

    process.exit(0);
}

debugAccounts().catch(console.error);
