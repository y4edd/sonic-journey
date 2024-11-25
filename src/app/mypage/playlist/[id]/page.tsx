import { PlaylistHeader } from "@/components/mypage/PlaylistDetail/PlaylistHeader/PlaylistHeader";
import PickSong from "@/components/special/DetailPage/PlayPickSong/PickSong/PickSong";
import BreadList from "@/components/top/BreadList/BreadList";
import type { DeezerTrackSong } from "@/types/deezer";
import { getPlaylistInfo } from "@/utils/apiFunc";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";
import styles from "./page.module.css";

type PlaylistInfo = {
  playlistTitle: string;
  playlistSongs: { api_song_id: number }[];
};

const Page = async ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const token = getTokenFromCookie();
  const playlistInfo: PlaylistInfo = await getPlaylistInfo(id, token);
  if (!playlistInfo) {
    return <p>プレイリストの情報が得られませんでした</p>;
  }

  const response = await fetch("http://localhost:3000/api/getSpecialSongInfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ songs: playlistInfo.playlistSongs }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("APIエラー:", response.status, errorText);
    throw new Error("プレイリスト曲の詳細情報の取得に失敗しました");
  }
  const playlistSongs: DeezerTrackSong[] = await response.json();

  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/mypage", title: "マイページ" },
          { link: "/mypage/playlist", title: "プレイリスト" },
          {
            link: `/mypage/playlist/${id}`,
            title: `${playlistInfo.playlistTitle}`,
          },
        ]}
      />
      <PlaylistHeader playlistTitle={playlistInfo.playlistTitle} />
      <div className={styles.playlistList}>
        <PickSong singles={playlistSongs} />
      </div>
    </>
  );
};

export default Page;
