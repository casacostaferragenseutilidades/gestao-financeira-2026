
import { storage } from "./server/storage.js";
import { db } from "./server/db.js";
import { accountsPayable, suppliers, categories, costCenters } from "./shared/schema.js";
import { eq, and, sql } from "drizzle-orm";

async function testRecurrence() {
    try {
        console.log("--- Starting Recurrence Test ---");

        // 1. Ensure we have prerequisites
        const [supplier] = await db.select().from(suppliers).limit(1);
        const [category] = await db.select().from(categories).limit(1);
        const [costCenter] = await db.select().from(costCenters).limit(1);

        if (!supplier || !category || !costCenter) {
            console.log("Missing prerequisites (supplier, category, or cost center). Please create them first.");
            return;
        }

        const testDescription = "Sistema Loja TESTE " + Date.now();
        const payload = {
            description: testDescription,
            amount: "100.00",
            dueDate: "2026-01-25",
            status: "pending",
            supplierId: supplier.id,
            categoryId: category.id,
            costCenterId: costCenter.id,
            paymentMethod: "pix",
            notes: "Teste de recorrência automática",
            recurrence: "monthly",
            recurrenceEnd: "2026-12-25",
            active: true
        };

        console.log("Creating account with payload:", JSON.stringify(payload, null, 2));

        const account = await storage.createAccountPayable(payload);
        console.log("Created main account:", account.id);

        // 2. Check if recurring entries were created
        // We expect January (main) + 11 more (Feb to Dec) = 12 total.
        const createdEntries = await db.select().from(accountsPayable).where(eq(accountsPayable.description, testDescription));

        console.log(`Total entries with description '${testDescription}': ${createdEntries.length}`);
        createdEntries.forEach(e => {
            console.log(` - ID: ${e.id}, DueDate: ${e.dueDate}, Recurrence: ${e.recurrence}`);
        });

        if (createdEntries.length === 12) {
            console.log("SUCCESS: 12 entries created correctly!");
        } else {
            console.log(`FAILURE: Expected 12 entries, but found ${createdEntries.length}`);
        }

        // Cleanup (optional, but keep it for now so the user can see it in the UI if they want)
        // await db.delete(accountsPayable).where(eq(accountsPayable.description, testDescription));

    } catch (err) {
        console.error("Test failed:", err);
    }
    process.exit(0);
}

testRecurrence();
