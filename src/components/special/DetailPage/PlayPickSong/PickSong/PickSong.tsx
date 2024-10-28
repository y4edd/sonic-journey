import PickSongs from "../PickSongs/PickSongs";
import styles from "./PickSong.module.css";
import type { DeezerTrackSong } from "@/types/deezer";

type PickSong = {
  id: number;
  title: string;
  preview: string;
};

const PickSong = ({ singles }: { singles: DeezerTrackSong[] }) => {
  return (
    <div className={styles.albumSinglesContent}>
      {singles.map((song: DeezerTrackSong, index: number) => {
        return (
          <div key={song.id} className={styles.albumSingleSong}>
            <PickSongs pickSong={song} />
          </div>
        );
      })}
    </div>
  );
};

export default PickSong;
