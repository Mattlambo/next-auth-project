// @ts-expect-error -- Seed script uses a Node-specific import


import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 1. Hash the password "password123" securely
  const hashedPassword = await bcrypt.hash("password123", 10);

  // 2. Insert or update the test user
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      name: "Test User",
      email: 'test@example.com',
      password: hashedPassword,
    },
  });

  console.log('✅ Database successfully seeded with user:', user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });