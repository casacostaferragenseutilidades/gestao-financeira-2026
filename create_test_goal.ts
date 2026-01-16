
import { storage } from "./server/storage.js";

async function createTestGoal() {
    try {
        const now = new Date();
        const goal = await storage.createFinancialGoal({
            name: "Meta de Teste",
            type: "income_total",
            targetAmount: "5000.00",
            month: now.getMonth() + 1,
            year: now.getFullYear(),
            categoryId: null,
            active: true
        });
        console.log("Created test goal:", goal);
    } catch (err) {
        console.error(err);
    }
    process.exit(0);
}

createTestGoal();
