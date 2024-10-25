import styles from "./SpecialPlaylist.module.css";
import type { DeezerTrackSong } from "@/types/deezer";
import AlbumSingles from "@/components/music/AlbumSingles/AlbumSingles";

type resultdAta = {
  id: number;
  title: string;
  cover_xl: string;
  nb_tracks: number;
  artist: {
    id: number;
    name: string;
    picture_xl: string;
  };
  albumSongs: [
    {
      id: number;
      title: string;
      duration: number;
      preview: string;
      cover_xl: string;
    }
  ];
};

export const SpecialPlaylist = ({
  specialPlaylistInfo,
}: {
  specialPlaylistInfo: DeezerTrackSong[];
}) => {
  console.log(
    "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
    specialPlaylistInfo
  );
  return (
    <div className={styles.albumPageContent}>
      <div className={styles.albumDetailContent}>
        <div className={styles.albumSongsContent}>
          <AlbumSingles singles={specialPlaylistInfo} />
        </div>
      </div>
    </div>
  );
};
