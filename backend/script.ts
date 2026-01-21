import { GroupFinder } from './find.ts'
import { prisma } from './lib/prisma.ts'

interface StudentInfo {
  name: string;
  indexNumber: number;
  id: number; // student_ID
  phone: number;
  group?: number; // optional preferred group from frontend
}

interface GroupMember {
  id: number;
  name: string;
  indexNumber: number;
  studentId: number;
  phoneNumber: number;
}

interface ResponseData {
  success: boolean;
  message: string;
  group?: number;
  groupMembers?: GroupMember[];
  isNewStudent?: boolean;
}

/**
 * Main handler for adding students to groups
 * 1. Checks if student already exists (by indexNumber or studentID)
 * 2. If exists, returns group info and all members
 * 3. If not exists, finds appropriate group and adds student
 */
async function handleAddStudent(info: StudentInfo): Promise<ResponseData> {
  // Check if student already exists
  const existingStudent = await prisma.user.findFirst({
    where: {
      OR: [
        { index_Number: info.indexNumber },
        { student_ID: info.id }
      ]
    }
  });

  if (existingStudent) {
    // Student already in database
    const groupMembers = await prisma.user.findMany({
      where: { Group: existingStudent.Group },
      select: {
        id: true,
        name: true,
        index_Number: true,
        student_ID: true,
        phone_number: true
      }
    });

    return {
      success: true,
      message: 'Student already registered',
      group: existingStudent.Group,
      groupMembers: groupMembers.map(member => ({
        id: member.id,
        name: member.name || '',
        indexNumber: member.index_Number,
        studentId: member.student_ID,
        phoneNumber: member.phone_number || 0
      })),
      isNewStudent: false
    };
  }

  // Student doesn't exist - find available group
  const groupFinder = new GroupFinder();
  const assignedGroup = await groupFinder.findAvailableGroup(info.group);

  // Add student to database
  const newStudent = await prisma.user.create({
    data: {
      name: info.name,
      index_Number: info.indexNumber,
      student_ID: info.id,
      phone_number: info.phone,
      Group: assignedGroup
    }
  });

  // Get all group members
  const groupMembers = await prisma.user.findMany({
    where: { Group: assignedGroup },
    select: {
      id: true,
      name: true,
      index_Number: true,
      student_ID: true,
      phone_number: true
    }
  });

  return {
    success: true,
    message: 'Student added successfully',
    group: assignedGroup,
    groupMembers: groupMembers.map(member => ({
      id: member.id,
      name: member.name || '',
      indexNumber: member.index_Number,
      studentId: member.student_ID,
      phoneNumber: member.phone_number || 0
    })),
    isNewStudent: true
  };
}

export { handleAddStudent };