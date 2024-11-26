import UnauthorizedAccess from "@/components/UnauthorizedAccess/UnauthorizedAccess";
import { PlaylistHeader } from "@/components/mypage/PlaylistDetail/PlaylistHeader/PlaylistHeader";
import PickSong from "@/components/special/DetailPage/PlayPickSong/PickSong/PickSong";
import BreadList from "@/components/top/BreadList/BreadList";
import type { DeezerTrackSong } from "@/types/deezer";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";
import Link from "next/link";
import styles from "./page.module.css";

type PlaylistInfo = {
  playlistTitle: string;
  playlistSongs: { api_song_id: number }[];
};

const Page = async ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const token = getTokenFromCookie();
  try {
    const res = await fetch(`http://localhost:3000/api/playlistSong?id=${id}`, {
      cache: "no-cache",
      headers: {
        Cookie: token,
      },
    });

    if (res.status === 401) {
      return <UnauthorizedAccess />;
    }
    if (!res.ok) {
      throw new Error("プレイリストの情報が得られませんでした");
    }

    const playlistInfo: PlaylistInfo = await res.json();

    const response = await fetch(
      "http://localhost:3000/api/getSpecialSongInfo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          songs: playlistInfo?.playlistSongs || [],
        }),
        cache: "no-store",
      }
    );

    const playlistSongs: DeezerTrackSong[] = await response.json();

    const playlistSongIds: { api_song_id: number; title: string }[] =
      playlistSongs.length > 0
        ? playlistSongs.map((playlistSong) => {
            return { api_song_id: playlistSong.id, title: playlistSong.title };
          })
        : [];

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
        <div className={styles.wrapper}>
          <PlaylistHeader
            playlistTitle={playlistInfo.playlistTitle}
            playlistId={id}
            playlistSongInfo={playlistSongIds}
          />
          <div className={styles.playlistList}>
            {playlistSongs.length > 0 ? (
              <PickSong singles={playlistSongs} />
            ) : (
              <>
                <p className={styles.noSongs}>曲を追加しましょう!!</p>
                <div className={styles.link}>
                  <Link href="/ranking" className={styles.rankingPageLink}>
                    人気楽曲ページへ →
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error(error);
  }
};
export default Page;
