import { HISTORY } from "@/constants/constant";
import Image from "next/image";
import Link from "next/link";
import styles from "./PlayHistory.module.css";

const PlayHistory = () => {
  // FIXME: 仮の視聴履歴を使用しています。
  return (
    <div className={styles.playHistoryGroup}>
      {HISTORY.length > 0 ? (
        HISTORY.map(
          (song: {
            id: number;
            image: string;
            title: string;
            artist: string;
          }) => {
            return (
              <Link href="/" key={song.id} className={styles.playHistorySong}>
                <Image src={song.image} alt={`${song.title}の画像`} width={150} height={150} />
                <p>{song.title}</p>
                <p>{song.artist}</p>
              </Link>
            );
          },
        )
      ) : (
        <p className={styles.nothingHistory}>試聴履歴がありません</p>
      )}
    </div>
  );
};

export default PlayHistory;
