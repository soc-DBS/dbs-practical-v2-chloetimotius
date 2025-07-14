-- CreateTable
CREATE TABLE "module" (
    "mod_code" TEXT NOT NULL,
    "mod_name" VARCHAR(100) NOT NULL,
    "credit_unit" INTEGER NOT NULL,

    CONSTRAINT "module_pkey" PRIMARY KEY ("mod_code")
);
