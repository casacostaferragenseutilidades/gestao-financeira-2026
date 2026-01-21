
import "dotenv/config";
import { db } from "../server/db";
import { accountsPayable, accountsReceivable, cashFlowEntries, companies } from "@shared/schema";
import { eq, like, isNull } from "drizzle-orm";

async function run() {
    console.log("Searching for CLAINFO SOLUCOES LTDA...");

    // Try to find by name or distinct part of the name
    // Note: using ilike for case-insensitive if supported, but let's stick to standard like with %
    // Ideally, exact match or verifying the list if multiple.
    const companyResults = await db.select().from(companies);

    const company = companyResults.find(c =>
        c.nome.toUpperCase().includes("CLAINFO") ||
        c.razaoSocial.toUpperCase().includes("CLAINFO")
    );

    if (!company) {
        console.error("Company 'CLAINFO' not found. Please register it first via the UI.");
        console.log("Available companies:", companyResults.map(c => c.nome).join(", "));
        process.exit(1);
    }

    console.log(`Found company: ${company.nome} (ID: ${company.id})`);
    console.log("Linking unlinked records to this company...");

    // Update Accounts Payable
    const resAP = await db.update(accountsPayable)
        .set({ companyId: company.id })
        .where(isNull(accountsPayable.companyId))
        .returning();
    console.log(`Updated ${resAP.length} accounts payable records.`);

    // Update Accounts Receivable
    const resAR = await db.update(accountsReceivable)
        .set({ companyId: company.id })
        .where(isNull(accountsReceivable.companyId))
        .returning();
    console.log(`Updated ${resAR.length} accounts receivable records.`);

    // Update Cash Flow Entries
    const resCF = await db.update(cashFlowEntries)
        .set({ companyId: company.id })
        .where(isNull(cashFlowEntries.companyId))
        .returning();
    console.log(`Updated ${resCF.length} cash flow entries.`);

    console.log("Migration completed successfully.");
    process.exit(0);
}

run().catch((err) => {
    console.error("Error executing migration:", err);
    process.exit(1);
});
