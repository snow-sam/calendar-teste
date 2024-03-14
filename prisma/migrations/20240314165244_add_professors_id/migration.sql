/*
  Warnings:

  - Added the required column `professorId` to the `Eventos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Eventos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "descricao" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "professorId" TEXT NOT NULL,
    CONSTRAINT "Eventos_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Eventos" ("data", "descricao", "id") SELECT "data", "descricao", "id" FROM "Eventos";
DROP TABLE "Eventos";
ALTER TABLE "new_Eventos" RENAME TO "Eventos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
