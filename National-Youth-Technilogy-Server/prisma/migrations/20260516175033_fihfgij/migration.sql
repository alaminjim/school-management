-- CreateTable
CREATE TABLE "about_section" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT,
    "title" TEXT,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "about_section_pkey" PRIMARY KEY ("id")
);
