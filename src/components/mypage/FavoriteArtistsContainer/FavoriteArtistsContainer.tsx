"use client";
import type { DeezerArtist } from "@/types/deezer";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import ActionButton from "../ActionButton/ActionButton";
import ArtistList from "../ArtistList/ArtistList";
import SortButtons from "../SortButtons/SortButtons";
import styles from "./FavoriteArtistsContainer.module.css";

type FavoriteArtistsContainerProps = {
  artistsInfo: {
    artistId: number;
    updatedAt: Date;
    artistData: DeezerArtist;
  }[];
};

const FavoriteArtistsContainer = ({ artistsInfo }: FavoriteArtistsContainerProps) => {
  // NOTE: 昇順フラグの状態を管理
  const [ascFlag, setAscFlag] = useState(false);

  const descArtistData = artistsInfo.map((artist) => artist.artistData);

  const ascArtistData = artistsInfo
    .toSorted((artistA, artistB) => {
      return artistA.updatedAt < artistB.updatedAt ? -1 : 1;
    })
    .map((artist) => artist.artistData);

  const artistData = ascFlag ? ascArtistData : descArtistData;

  return (
    <>
      <SortButtons label="登録日" onSortChange={(flag) => setAscFlag(flag)} />
      <div className={styles.actionButtonContainer}>
        <ActionButton name="編集" icon={<EditIcon />} url="/mypage/favoriteartist/edit" />
      </div>
      <ArtistList artists={artistData} errorMessage="お気に入りアーティストは登録されていません" />
    </>
  );
};

export default FavoriteArtistsContainer;
