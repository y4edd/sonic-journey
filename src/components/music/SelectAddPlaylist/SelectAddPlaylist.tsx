"use client";

import type { Playlist } from "@prisma/client";
import { ChangeEvent, useEffect } from "react";
import { FormEvent } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import styles from "./SelectAddPlaylist.module.css";

export const SelectAddPlaylist = ({
  user_id,
  music_id,
  playlists,
  defaultPlaylists,
  setAddListOpen,
}: {
  user_id: string;
  music_id: number;
  playlists: Playlist[];
  defaultPlaylists: { playlist_id: number; music_flag: boolean }[];
  setAddListOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  // チェックされているプレイリスト
  const [addPlaylists, setAddPlaylists] =
    useState<{ playlist_id: number; music_flag: boolean }[]>(defaultPlaylists);

  // defaultと最新の差分のあるプレイリストを獲得
  const [diffPlaylists, setDiffPlaylists] = useState<
    { playlist_id: number; music_flag: boolean }[]
  >([]);

  useEffect(() => {
    setAddPlaylists(defaultPlaylists);
  }, [defaultPlaylists]);

  // クリックされたプレイリストのmusic_flagを逆転する
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // クリックされたプレイリストデータを取得
    const changePlaylist = addPlaylists.filter(
      (addPlaylist) => addPlaylist.playlist_id === Number(e.target.value)
    );

    // addPlaylistsからクリックしたプレイリストデータを削除
    setAddPlaylists((prevStateArr) =>
      prevStateArr.filter(
        (prevState) => prevState.playlist_id !== Number(e.target.value)
      )
    );

    // music_flagを逆転させたプレイリストデータを作成
    const changedPlaylist = {
      playlist_id: changePlaylist[0].playlist_id,
      music_flag: !changePlaylist[0].music_flag,
    };

    setAddPlaylists((prevState) => [...prevState, changedPlaylist]);
  };

  const checkedCheck = (playlist_id: number) => {
    const checkedPlaylist = addPlaylists.filter(
      (addPlaylist) => addPlaylist.playlist_id === playlist_id
    );
    if (checkedPlaylist.length === 1) {
      return checkedPlaylist[0].music_flag;
    }
    return false;
  };

  useEffect(() => {
    if (defaultPlaylists.length === addPlaylists.length) {
      setDiffPlaylists(
        addPlaylists.filter((addPlaylist) => {
          const defaultPlaylist = defaultPlaylists.find(
            (p) => p.playlist_id === addPlaylist.playlist_id
          );
          return (
            defaultPlaylist &&
            addPlaylist.music_flag !== defaultPlaylist.music_flag
          );
        })
      );
    }
  }, [defaultPlaylists, addPlaylists]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const addRes = await fetch("http://localhost:3000/api/musicAddPlaylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ diffPlaylists, music_id }),
        cache: "no-cache",
      });

      if (!addRes.ok) {
        throw new Error("プレイリストに楽曲の追加ができませんでした");
      }
    } catch (error) {
      console.error(error);
    }

    try {
      const delRes = await fetch(
        "http://localhost:3000/api/musicDeletePlaylist",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ diffPlaylists, music_id }),
          cache: "no-cache",
        }
      );
      setAddListOpen(false);
      alert("プレイリストが編集されました");
      if (!delRes.ok) {
        throw new Error("プレイリストの楽曲の削除ができませんでした");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {defaultPlaylists.length === 0 && <p>プレイリストがありません</p>}
      {defaultPlaylists.length === addPlaylists.length &&
        defaultPlaylists.length !== 0 && (
          <form onSubmit={handleSubmit}>
            {playlists.map((playlist: Playlist) => (
              <div className="playlist" key={playlist.id}>
                <input
                  type="checkbox"
                  id={playlist.name}
                  name="addPlaylist"
                  value={playlist.id}
                  defaultChecked={checkedCheck(playlist.id)}
                  onChange={handleChange}
                  className={styles.playlistCheck}
                />
                <label htmlFor={playlist.name}>{playlist.name}</label>
              </div>
            ))}
            <button type="submit">完了</button>
          </form>
        )}
    </>
  );
};
