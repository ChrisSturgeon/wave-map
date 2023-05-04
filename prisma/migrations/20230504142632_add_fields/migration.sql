/*
  Warnings:

  - Added the required column `cafe` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parking` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toilets` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wavetype` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "cafe" TEXT NOT NULL,
ADD COLUMN     "kitesurfing" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "paddleboarding" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parking" TEXT NOT NULL,
ADD COLUMN     "surfing" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "toilets" TEXT NOT NULL,
ADD COLUMN     "wavetype" TEXT NOT NULL,
ADD COLUMN     "windsurfing" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wingsurfing" BOOLEAN NOT NULL DEFAULT false;
