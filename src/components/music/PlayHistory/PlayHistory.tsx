import type { DeezerSong } from "@/types/deezer";
import { getSong } from "@/utils/apiFunc";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";
import { getPlayHistory } from "@/utils/history";
import Image from "next/image";
import Link from "next/link";
import styles from "./PlayHistory.module.css";

const PlayHistory = async () => {
  // クッキーからトークン取得
  const token = getTokenFromCookie();

  if (!token) {
    return (
      <div className={styles.playHistoryGroup}>
        <Link href="/user/login" className={styles.noLoginHistory}>
          ログインユーザーの機能です
        </Link>
      </div>
    );
  }
  // ログインユーザーの試聴履歴楽曲のidを取得
  const playHistory = await getPlayHistory(token, 6);
  // 取得したidを使って楽曲情報を取得
  const playHistories = await Promise.all(playHistory.songIds.map((id: number) => getSong(id)));

  const playHistorySongs = playHistories.map((playHistorySong) => {
    return playHistorySong.resSongData;
  });

  console.log(playHistorySongs);

  return (
    <div className={styles.playHistoryGroup}>
      {playHistorySongs.length > 0 ? (
        playHistorySongs.map((song: DeezerSong) => {
          return (
            <Link href={`/music/${song.id}`} key={song.id} className={styles.playHistorySong}>
              <Image src={song.cover_xl} alt={`${song.title}の画像`} width={150} height={150} />
              <p>{song.title}</p>
              <p>{song.artist.name}</p>
            </Link>
          );
        })
      ) : (
        <p className={styles.nothingHistory}>試聴履歴がありません</p>
      )}
    </div>
  );
};

export default PlayHistory;
