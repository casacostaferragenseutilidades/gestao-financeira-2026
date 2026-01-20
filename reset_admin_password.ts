import { config } from 'dotenv';
import { db } from "./server/db.js";
import { users } from "./shared/schema.js";
import { eq } from "drizzle-orm";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

// Load environment variables
config();

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function resetAdminPassword() {
    try {
        // Find admin user
        const [adminUser] = await db.select().from(users).where(eq(users.username, 'admin'));
        
        if (!adminUser) {
            console.log('Usuário admin não encontrado. Criando novo usuário admin...');
            
            // Create new admin user with default password
            const newPassword = 'admin123';
            const hashedPassword = await hashPassword(newPassword);
            
            const [newAdmin] = await db.insert(users).values({
                username: 'admin',
                password: hashedPassword,
                fullName: 'Administrador',
                role: 'admin',
                status: 'active',
                team: null
            }).returning();
            
            console.log('Usuário admin criado com sucesso!');
            console.log('Username: admin');
            console.log('Password: admin123');
            console.log('Por favor, altere a senha após o primeiro login.');
            
        } else {
            // Reset existing admin password
            const newPassword = 'admin123';
            const hashedPassword = await hashPassword(newPassword);
            
            const [updated] = await db.update(users)
                .set({ password: hashedPassword })
                .where(eq(users.username, 'admin'))
                .returning();
            
            console.log('Senha do usuário admin resetada com sucesso!');
            console.log('Username: admin');
            console.log('Password: admin123');
            console.log('Por favor, altere a senha após o primeiro login.');
        }
        
    } catch (err) {
        console.error('Erro ao resetar senha do admin:', err);
    }
    process.exit(0);
}

resetAdminPassword();
