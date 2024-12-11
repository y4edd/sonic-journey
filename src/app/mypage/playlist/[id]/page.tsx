import UnauthorizedAccess from "@/components/UnauthorizedAccess/UnauthorizedAccess";
import { PlaylistHeader } from "@/components/mypage/PlaylistDetail/PlaylistHeader/PlaylistHeader";
import { PlaylistSongList } from "@/components/mypage/PlaylistDetail/PlaylistSongList/PlaylistSongList";
import BreadList from "@/components/top/BreadList/BreadList";
import type { DeezerTrackSong } from "@/types/deezer";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";
import styles from "./page.module.css";

type PlaylistSongsAudio = {
  preview?: string;
  id: number;
  title: string;
  img: string;
  album_id: number;
};

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

    const response = await fetch("http://localhost:3000/api/getSpecialSongInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        songs: playlistInfo?.playlistSongs || [],
      }),
      cache: "no-store",
    });

    const playlistSongs: DeezerTrackSong[] = await response.json();

    const playlistSongIds: { api_song_id: number; title: string }[] =
      playlistSongs.length > 0
        ? playlistSongs.map((playlistSong) => {
            return { api_song_id: playlistSong.id, title: playlistSong.title };
          })
        : [];

    const playlistSongsAudio: PlaylistSongsAudio[] =
      playlistSongs.length > 0
        ? playlistSongs.map((playlistSong) => {
            return {
              preview: playlistSong.preview,
              id: playlistSong.id,
              title: playlistSong.title,
              img: playlistSong.cover_xl,
              album_id: playlistSong.album.id,
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
          <PlaylistSongList playlistSongsAudio={playlistSongsAudio} />
        </div>
      </>
    );
  } catch (error) {
    console.error(error);
  }
};
export default Page;
