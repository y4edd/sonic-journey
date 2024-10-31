-- AlterTable
ALTER TABLE "Favorite_Artist" ALTER COLUMN "api_artist_id" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "Favorite_Song" ALTER COLUMN "api_song_id" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "History" ALTER COLUMN "api_song_id" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "Pick_Song" ALTER COLUMN "api_song_id" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "Playlist_Song" ALTER COLUMN "api_song_id" SET DATA TYPE BIGINT;
