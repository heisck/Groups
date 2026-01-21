-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "index_Number" INTEGER NOT NULL,
    "student_ID" INTEGER NOT NULL,
    "name" TEXT,
    "Group" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_index_Number_key" ON "User"("index_Number");

-- CreateIndex
CREATE UNIQUE INDEX "User_student_ID_key" ON "User"("student_ID");
