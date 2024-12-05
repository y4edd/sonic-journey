import UnauthorizedAccess from "@/components/UnauthorizedAccess/UnauthorizedAccess";
import DeleteButton from "@/components/mypage/DeleteButton/DeleteButton";
import MenuHeader from "@/components/mypage/MenuHeader/MenuHeader";
import SongList from "@/components/mypage/SongList/SongList";
import BreadList from "@/components/top/BreadList/BreadList";
import { checkLoggedInServer, getSong, getUserId } from "@/utils/apiFunc";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";
import { getPlayHistory } from "@/utils/history";
import Link from "next/link";
import styles from "./page.module.css";

const PlayList = async () => {
  // クッキーからトークン取得
  const token = getTokenFromCookie();

  const isLoggedin = await checkLoggedInServer(token);

  if (!isLoggedin) {
    return <UnauthorizedAccess />;
  }

  const userId = await getUserId(token);

  if (!userId) {
    return (
      <div className={styles.playHistoryGroup}>
        <p>ユーザーIDが見つかりません。</p>
      </div>
    );
  }

  // ログインユーザーの試聴履歴楽曲のidを取得
  const playHistory = await getPlayHistory(token, 10);

  // 取得したidを使って楽曲情報を取得
  const playHistories = await Promise.all(playHistory.songIds.map((id: number) => getSong(id)));

  const historySongsInfo = playHistories.map((playHistorySong) => {
    return playHistorySong.resSongData;
  });

  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/mypage", title: "マイページ" },
          { link: "/mypage/history", title: "再生履歴" },
        ]}
      />
      <MenuHeader title="再生履歴" />

      {historySongsInfo.length > 0 ? (
        <div>
          <DeleteButton userId={userId} />
          <SongList songs={historySongsInfo} errorMessage="履歴がありません" url="music" />
        </div>
      ) : (
        <div className={styles.nothingHistory}>
          <p>試聴履歴がありません</p>
        </div>
      )}
    </>
  );
};

export default PlayList;
