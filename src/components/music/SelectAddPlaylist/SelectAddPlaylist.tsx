"use client";

import type { Playlist } from "@prisma/client";
import { ChangeEvent, useEffect } from "react";
import { FormEvent } from "react";
import type { Dispatch, SetStateAction } from "react";
import "react-toastify/dist/ReactToastify.css";
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
  defaultPlaylists: { playlist_id: number }[];
  setAddListOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  // チェックされているプレイリスト
  const [addPlaylists, setAddPlaylists] =
    useState<{ playlist_id: number }[]>(defaultPlaylists);

  // 新たに追加するプレイリスト
  const [addSubmitPlaylists, setAddSubmitPlaylists] = useState<
    { playlist_id: number }[]
  >([]);

  // 削除されるプレイリスト
  const [deleteSubmitPlaylists, setDeleteSubmitPlaylists] = useState<
    { playlist_id: number }[]
  >([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const exists = addPlaylists.some(
      (addPlaylist) => addPlaylist.playlist_id === Number(e.target.value)
    );
    if (exists) {
      setAddPlaylists((prevState) =>
        prevState.filter(
          (addPlaylist) => addPlaylist.playlist_id !== Number(e.target.value)
        )
      );
    } else {
      setAddPlaylists((prevState) => [
        ...prevState,
        { playlist_id: Number(e.target.value) },
      ]);
    }
  };

  useEffect(() => {
    setAddSubmitPlaylists(
      addPlaylists.filter(
        (addPlaylist) => !defaultPlaylists.includes(addPlaylist)
      )
    );
    setDeleteSubmitPlaylists(
      defaultPlaylists.filter(
        (defaultPlaylist) => !addPlaylists.includes(defaultPlaylist)
      )
    );
  }, [defaultPlaylists, addPlaylists]);

  console.log("default", defaultPlaylists);
  console.log("add", addPlaylists);
  console.log("追加", addSubmitPlaylists);
  console.log("削除", deleteSubmitPlaylists);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const addRes = await fetch("http://localhost:3000/api/musicAddPlaylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addSubmitPlaylists, music_id }),
        cache: "no-cache",
      });

      if (!addRes.ok) {
        throw new Error("プレイリストに楽曲の追加ができませんでした");
      }
      setAddListOpen(false);
      alert("プレイリストが編集されました");
    } catch (error) {
      console.error(error);
    }

    try {
      const delRes = await fetch(
        "http://localhost:3000/api/musicDeletePlaylist",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ addSubmitPlaylists, music_id }),
          cache: "no-cache",
        }
      );

      if (!delRes.ok) {
        throw new Error("プレイリストの楽曲の削除ができませんでした");
      }
      setAddListOpen(false);
      alert("プレイリストが編集されました");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {playlists.map((playlist: Playlist) => (
          <div className="playlist" key={playlist.id}>
            <input
              type="checkbox"
              id={playlist.name}
              name="addPlaylist"
              value={playlist.id}
              defaultChecked={addPlaylists.some(
                (p) => p.playlist_id === playlist.id
              )}
              onChange={handleChange}
              className={styles.playlistCheck}
            />
            <label htmlFor={playlist.name}>{playlist.name}</label>
          </div>
        ))}
        <button type="submit">完了</button>
      </form>
    </>
  );
};
