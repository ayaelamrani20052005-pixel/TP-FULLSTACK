require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcryptjs');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hash = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@tp.com' },
    update: {},
    create: { nom: 'Admin', prenom: 'Super', email: 'admin@tp.com', password: hash, role: 'admin' },
  });
  console.log('Admin créé : admin@tp.com / admin123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
