/*
  Warnings:

  - Added the required column `phone_number` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "index_Number" INTEGER NOT NULL,
    "student_ID" INTEGER NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "name" TEXT,
    "Group" INTEGER NOT NULL
);
INSERT INTO "new_User" ("Group", "id", "index_Number", "name", "student_ID") SELECT "Group", "id", "index_Number", "name", "student_ID" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_index_Number_key" ON "User"("index_Number");
CREATE UNIQUE INDEX "User_student_ID_key" ON "User"("student_ID");
CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
