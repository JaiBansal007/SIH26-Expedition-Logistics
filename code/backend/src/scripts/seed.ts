import { insertdumpdata } from '../controller/Dump';
import { db } from '../db/connection';

async function main() {
    console.log('🌱 Starting database seeding...');
    try {
        await insertdumpdata();
        console.log('✅ Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

// Execute the seeder
main();
