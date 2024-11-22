"use client";

import AddBoxIcon from "@mui/icons-material/AddBox";
import type { Playlist } from "@prisma/client";
import Link from "next/link";
import { type ChangeEvent, useEffect } from "react";
import type { FormEvent } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import styles from "./SelectAddPlaylist.module.css";

export const SelectAddPlaylist = ({
  musicId,
  playlists,
  defaultPlaylists,
  setModalOpen,
}: {
  musicId: number;
  playlists: Playlist[];
  defaultPlaylists: { playlistId: number; musicFlag: boolean }[];
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  // チェックされているプレイリスト
  const [addPlaylists, setAddPlaylists] =
    useState<{ playlistId: number; musicFlag: boolean }[]>(defaultPlaylists);

  // defaultと最新の差分のあるプレイリストを獲得
  const [diffPlaylists, setDiffPlaylists] = useState<
    { playlistId: number; musicFlag: boolean }[]
  >([]);

  useEffect(() => {
    setAddPlaylists(defaultPlaylists);
  }, [defaultPlaylists]);

  // クリックされたプレイリストのmusicFlagを逆転する
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // クリックされたプレイリストデータを取得
    const changePlaylist = addPlaylists.filter(
      (addPlaylist) => addPlaylist.playlistId === Number(e.target.value)
    );

    // addPlaylistsからクリックしたプレイリストデータを削除
    setAddPlaylists((prevStateArr) =>
      prevStateArr.filter(
        (prevState) => prevState.playlistId !== Number(e.target.value)
      )
    );

    // musicFlagを逆転させたプレイリストデータを作成
    const changedPlaylist = {
      playlistId: changePlaylist[0].playlistId,
      musicFlag: !changePlaylist[0].musicFlag,
    };

    setAddPlaylists((prevState) => [...prevState, changedPlaylist]);
  };

  const checkedCheck = (playlistId: number) => {
    const checkedPlaylist = defaultPlaylists.filter(
      (defaultPlaylist) => defaultPlaylist.playlistId === playlistId
    );
    if (checkedPlaylist.length === 1) {
      return checkedPlaylist[0].musicFlag;
    }
    return false;
  };

  useEffect(() => {
    if (defaultPlaylists.length === addPlaylists.length) {
      setDiffPlaylists(
        addPlaylists.filter((addPlaylist) => {
          const defaultPlaylist = defaultPlaylists.find(
            (p) => p.playlistId === addPlaylist.playlistId
          );
          return (
            defaultPlaylist &&
            addPlaylist.musicFlag !== defaultPlaylist.musicFlag
          );
        })
      );
    }
  }, [defaultPlaylists, addPlaylists]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (diffPlaylists.length > 0) {
      e.preventDefault();

      try {
        const addRes = await fetch(
          "http://localhost:3000/api/musicAddPlaylist",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ diffPlaylists, musicId }),
            cache: "no-cache",
          }
        );

        if (!addRes.ok) {
          alert("プレイリストに楽曲の追加ができませんでした");
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
            body: JSON.stringify({ diffPlaylists, musicId }),
            cache: "no-cache",
          }
        );
        setModalOpen(false);
        alert("プレイリストが編集されました");
        if (!delRes.ok) {
          alert("プレイリストの楽曲の削除ができませんでした");
          throw new Error("プレイリストの楽曲の削除ができませんでした");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setModalOpen(false);
    }
  };

  return (
    <>
      {defaultPlaylists.length === 0 && (
        <>
          <p className={styles.noPlaylist}>プレイリストがありません</p>
          <Link href="/mypage/playlist" className={styles.playlistLink}>
            <AddBoxIcon className={styles.addLinkIcon} />
            プレイリストを新規作成
          </Link>
        </>
      )}
      {defaultPlaylists.length === addPlaylists.length &&
        defaultPlaylists.length !== 0 && (
          <>
            <p className={styles.modalTitle}>楽曲の追加先</p>
            <form onSubmit={handleSubmit}>
              {playlists.map((playlist: Playlist) => (
                <div className={styles.playlist} key={playlist.id}>
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
              <div className={styles.buttonContainer}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className={styles.cancelButton}
                >
                  キャンセル
                </button>
                <button type="submit" className={styles.createButton}>
                  追加
                </button>
              </div>
            </form>
            <Link href="/mypage/playlist" className={styles.playlistLink}>
              <AddBoxIcon className={styles.addLinkIcon} />
              プレイリストを新規作成
            </Link>
          </>
        )}
    </>
  );
};
