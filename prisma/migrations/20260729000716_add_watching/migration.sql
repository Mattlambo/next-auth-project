-- CreateTable
CREATE TABLE "Watching" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tmdbId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "posterPath" TEXT,
    "overview" TEXT,
    "firstAirDate" TEXT,
    "voteAverage" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Watching_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Watching_userId_tmdbId_key" ON "Watching"("userId", "tmdbId");
