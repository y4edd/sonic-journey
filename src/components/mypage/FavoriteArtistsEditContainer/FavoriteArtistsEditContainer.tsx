"use client";
import type { DeezerArtist } from "@/types/deezer";
import { deleteFavoriteArtists } from "@/utils/favoriteArtist";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ActionButton from "../ActionButton/ActionButton";
import SelectableArtistList from "../SelectableArtistList/SelectableArtistList";
import styles from "./FavoriteArtistsEditContainer.module.css";

type ArtistInfo = {
  artistId: number;
  updatedAt: Date;
  artistData: DeezerArtist;
};

const FavoriteArtistsEditContainer = ({ artistsInfo }: { artistsInfo: ArtistInfo[] }) => {
  const router = useRouter();
  // 選択されているアーティストを管理、登録解除ボタンのdisabledプロパティを管理
  const [selectedArtists, setSelectedArtists] = useState<number[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    setSelectedArtists((prev) => {
      // isCheckedがtrueのときアーティストidを追加し、falseのとき除外する
      const newSelectedArtists = isChecked
        ? [...prev, id]
        : prev.filter((artistId) => artistId !== id);

      // アーティストが選択されていないとき、解除ボタンを無効化する
      setIsButtonDisabled(!newSelectedArtists.length);
      return newSelectedArtists;
    });
  };

  const handleDisableButtonClick = async () => {
    await deleteFavoriteArtists(selectedArtists);
    // router.refresh()後に state を保持しないように初期値をセットする
    setSelectedArtists([]);
    setIsButtonDisabled(true);
    router.refresh();
  };

  const artistData = artistsInfo.map((artist) => artist.artistData);

  return (
    <>
      <div className={styles.actionButtonContainer}>
        <ActionButton name="キャンセル" icon={<CancelIcon />} url="/mypage/favoriteartist" />
      </div>
      <SelectableArtistList
        artists={artistData}
        selectedArtists={selectedArtists}
        onChange={handleCheckboxChange}
        errorMessage="お気に入りアーティストは登録されていません"
      />
      <div className={styles.removeFavoriteButtonContainer}>
        <button
          type="button"
          className={styles.removeFavoriteButton}
          disabled={isButtonDisabled}
          onClick={handleDisableButtonClick}
        >
          お気に入り登録解除
        </button>
      </div>
    </>
  );
};

export default FavoriteArtistsEditContainer;
