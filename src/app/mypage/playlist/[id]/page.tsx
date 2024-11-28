import UnauthorizedAccess from "@/components/UnauthorizedAccess/UnauthorizedAccess";
import { PlaylistHeader } from "@/components/mypage/PlaylistDetail/PlaylistHeader/PlaylistHeader";
import PlaylistSongButtons from "@/components/mypage/PlaylistDetail/PlaylistSongButtons/PlaylistSongButtons";
import BreadList from "@/components/top/BreadList/BreadList";
import type { DeezerTrackSong } from "@/types/deezer";
import SongsAudio from "@/components/music/SongsAudio/SongsAudio";
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

    const playlistSongsAudio: {
      preview?: string;
      id: number;
      title: string;
      img: string;
    }[] =
      playlistSongs.length > 0
        ? playlistSongs.map((playlistSong) => {
            return {
              preview: playlistSong.preview,
              id: playlistSong.id,
              title: playlistSong.title,
              img: playlistSong.cover_xl,
            };
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
          {playlistSongs.length > 0 ? (
            <SongsAudio playlistSongsAudio={playlistSongsAudio} />
          ) : null}
          <div className={styles.playlistList}>
            {playlistSongs.length > 0 ? (
              <PlaylistSongButtons singles={playlistSongs} />
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
