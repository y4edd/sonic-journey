"use client";

import { playlistTitleSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { z } from "zod";
import styles from "./PlaylistForm.module.css";

type PlayListFormData = z.infer<typeof playlistTitleSchema>;

const PlaylistForm = () => {
  // NOTE: React Hook Formのフック
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayListFormData>({
    resolver: zodResolver(playlistTitleSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<PlayListFormData> = async (data: PlayListFormData) => {
    // FIXME: プレイリスト作成ボタンを押下したときの処理を追加する
    console.log(data.playlistTitle); // 入力データ確認用
    router.back();
  };

  const onDismiss = () => {
    router.back();
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend className={styles.formTitle}>プレイリスト作成</legend>
          <div className={styles.formInput}>
            <label htmlFor="playlistTitle">タイトル</label>
            <input
              type="text"
              id="playlistTitle"
              placeholder="マイプレイリスト"
              {...register("playlistTitle")}
            />
            <div className={styles.errorMessage}>
              {errors.playlistTitle?.message && <span>{errors.playlistTitle.message}</span>}
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button type="button" onClick={onDismiss} className={styles.cancelButton}>
              キャンセル
            </button>
            <button type="submit" className={styles.createButton}>
              作成
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default PlaylistForm;
