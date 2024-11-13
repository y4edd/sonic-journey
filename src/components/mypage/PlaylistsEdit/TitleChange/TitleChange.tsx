"use client";

import { playlistTitleSchema } from "@/lib/validation";
import type { Playlist } from "@/types/deezer";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./TitleChange.module.css";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

type PlaylistFormData = z.infer<typeof playlistTitleSchema>;

export const TitleChange = ({
  playlist,
  setTitleChangeFlag,
  index,
}: {
  playlist: Playlist;
  setTitleChangeFlag: Dispatch<SetStateAction<boolean[]>>;
  index: number;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlaylistFormData>({
    resolver: zodResolver(playlistTitleSchema),
  });

  const [formData, setFormData] = useState<PlaylistFormData | null>(null);

  const onSubmit: SubmitHandler<PlaylistFormData> = (
    data: PlaylistFormData
  ) => {
    setFormData(data);
  };

  const onCancel = () => {
    setTitleChangeFlag((prevState) =>
      prevState.map((ele, i) => (index === i ? false : ele))
    );
  };

  useEffect(() => {
    const createPlaylist = async () => {
      if (!formData) return;

      try {
        const res = await fetch("http://localhost:3000/api/updatePlaylist", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: playlist.id,
            name: formData.playlistTitle,
            user_id: playlist.user_id,
          }),
          cache: "no-cache",
        });

        if (res.status === 409) {
          alert("同名のプレイリストが既に作成されています");
        } else if (!res.ok) {
          throw new Error("データが見つかりませんでした");
        } else {
          // alert("プレイリスト名が変更されました");
          playlist.name = formData.playlistTitle;
          setTitleChangeFlag((prevState) =>
            prevState.map((ele, i) => (index === i ? false : ele))
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    createPlaylist();
  }, [formData]);

  return (
    <div className={styles.playlistList}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.listWrapper}>
          <div className={styles.text}>
            <input
              type="text"
              placeholder={playlist.name}
              {...register("playlistTitle")}
              className={styles.input}
            />
            <div className={styles.errorMessage}>
              {errors.playlistTitle?.message && (
                <span>{errors.playlistTitle.message}</span>
              )}
            </div>
          </div>
          <div className={styles.button}>
            <button type="submit" className={styles.createButton}>
              <CheckCircleIcon className={styles.checkIcon} />
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onCancel}
            >
              <CancelIcon className={styles.cancelIcon} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
