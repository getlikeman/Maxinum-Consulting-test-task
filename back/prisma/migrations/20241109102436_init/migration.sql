-- CreateTable
CREATE TABLE "transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dateTime" DATETIME NOT NULL,
    "author" TEXT NOT NULL,
    "sum" BIGINT NOT NULL,
    "category" TEXT,
    "comment" TEXT
);
