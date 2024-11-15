"use client";
import type { DeezerArtist } from "@/types/deezer";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useMemo, useState } from "react";
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
  // NOTE: 降順のアーティストデータをキャッシュ
  const descArtistData = useMemo(
    () => artistsInfo.map((artist) => artist.artistData),
    [artistsInfo],
  );

  // NOTE: 昇順のアーティストデータをキャッシュ
  const ascArtistData = useMemo(() => {
    return artistsInfo
      .toSorted((artistA, artistB) => {
        return artistA.updatedAt < artistB.updatedAt ? -1 : 1;
      })
      .map((artist) => artist.artistData);
  }, [artistsInfo]);

  // NOTE: useStateで昇順、降順の状態を管理
  const [ascFlag, setAscFlag] = useState(false);
  const [artistData, setArtistData] = useState(descArtistData);

  // NOTE: useEffectでascFlagが変化したときにartistDataを更新
  useEffect(() => {
    if (ascFlag) {
      setArtistData(ascArtistData);
    } else {
      setArtistData(descArtistData);
    }
  }, [ascFlag, ascArtistData, descArtistData]);

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
