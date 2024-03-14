/*
  Warnings:

  - Added the required column `data` to the `Eventos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Eventos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "descricao" TEXT NOT NULL,
    "data" DATETIME NOT NULL
);
INSERT INTO "new_Eventos" ("descricao", "id") SELECT "descricao", "id" FROM "Eventos";
DROP TABLE "Eventos";
ALTER TABLE "new_Eventos" RENAME TO "Eventos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
