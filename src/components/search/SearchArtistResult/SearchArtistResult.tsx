import type { DeezerArtist } from "@/types/deezer";
import { getFreeArtist } from "@/utils/apiFunc";
import SearchArtistResultContent from "../SearchArtistResultContent/SearchArtistResultContent";
import SearchTotal from "../SearchTotal/SearchTotal";
import styles from "./SearchArtistResult.module.css";

const SearchArtistResult = async ({
  freeWord,
  url,
  style,
}: {
  freeWord: string;
  url: string;
  style: string;
}) => {
  const res = await getFreeArtist(freeWord);
  const searchArtist: DeezerArtist[] = res.resultData;

  return (
    <div>
      <div>
        <SearchTotal searchTotal={String(searchArtist.length)} name="アーティスト" />
      </div>
      <div className={style === "grid" ? styles.artistGroup : styles.none}>
        {searchArtist.map((result: DeezerArtist) => {
          return (
            <SearchArtistResultContent key={result.id} result={result} url={url} style={style} />
          );
        })}
      </div>
    </div>
  );
};

export default SearchArtistResult;
