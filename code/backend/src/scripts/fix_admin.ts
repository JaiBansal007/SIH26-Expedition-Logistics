import { db } from '../db/connection';
import { role, role_tabs } from '../db/schema';
import { eq } from 'drizzle-orm';

async function updateAdminAccess() {
  try {
    const adminRole = await db.select().from(role).where(eq(role.role_name, 'Admin'));
    if (adminRole.length > 0) {
      await db.update(role_tabs).set({ status: true }).where(eq(role_tabs.role_id, adminRole[0].id));
      console.log('✅ Admin tab access updated successfully in the live database!');
    } else {
      console.log('Admin role not found.');
    }
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
}
updateAdminAccess();
