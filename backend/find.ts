import { prisma } from './lib/prisma.ts'

export class GroupFinder {
  /**
   * Finds an available group (between 1 and 10) with less than 38 students
   * Starts with preferred group, then searches sequentially if needed
   */
  async findAvailableGroup(preferredGroup?: number): Promise<number> {
    const startGroup = preferredGroup || Math.ceil(Math.random() * 10);
    
    for (let i = 0; i < 10; i++) {
      const groupNumber = ((startGroup - 1 + i) % 10) + 1;
      const studentCount = await prisma.user.count({
        where: { Group: groupNumber }
      });
      
      if (studentCount < 38) {
        return groupNumber;
      }
    }
    
    // Fallback - should not reach here if max 380 students
    throw new Error('No available groups with capacity');
  }
}
