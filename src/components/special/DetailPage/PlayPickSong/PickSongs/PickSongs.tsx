"use client";

import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import Image from "next/image";
import AlbumSingleSongAudio from "@/components/music/AlbumSingleSongAudio/AlbumSingleSongAudio";

import styles from "./PickSongs.module.css";
import type { DeezerTrackSong } from "@/types/deezer";
import { useAlbumAudio } from "@/context/AlbumAudioContext";

const PickSongs = ({ pickSong }: { pickSong: DeezerTrackSong }) => {
  const { currentlyPlayingId, setCurrentlyPlayingId } = useAlbumAudio();
  const isPlaying = currentlyPlayingId === pickSong.id;
  const handlePlay = () => {
    setCurrentlyPlayingId(pickSong.id);
  };
  const handlePause = () => {
    setCurrentlyPlayingId(null);
  };
  return (
    <div className={styles.albumSingleContent}>
      <Link href={`/album/${pickSong.album.id}`} className={styles.linkImage}>
        <Image src={pickSong.cover_xl} alt="" height={60} width={60} />
      </Link>
      <AlbumSingleSongAudio
        preview={pickSong.preview}
        handlePlay={handlePlay}
        handlePause={handlePause}
        isPlaying={isPlaying}
      />
      <div className={styles.albumSingleInfo}>
        <p>
          <Link href={`/music/${pickSong.id}`}>{pickSong.title}</Link>
        </p>
        <button type="button">
          <FavoriteIcon
            sx={{
              fontSize: 16,
              color: "#fc9aff",
              cursor: "pointer",
            }}
            role="img"
            aria-hidden="false"
          />
        </button>
      </div>
    </div>
  );
};

export default PickSongs;
