/*
  Warnings:

  - You are about to alter the column `sum` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dateTime" DATETIME NOT NULL,
    "author" TEXT NOT NULL,
    "sum" INTEGER NOT NULL,
    "category" TEXT,
    "comment" TEXT
);
INSERT INTO "new_transactions" ("author", "category", "comment", "dateTime", "id", "sum") SELECT "author", "category", "comment", "dateTime", "id", "sum" FROM "transactions";
DROP TABLE "transactions";
ALTER TABLE "new_transactions" RENAME TO "transactions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
