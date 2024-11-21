import type { DeezerArtist } from "@/types/deezer";
import { getFreeArtist } from "@/utils/apiFunc";
import SearchArtistResultContent from "../SearchArtistResultContent/SearchArtistResultContent";
import SearchTotal from "../SearchTotal/SearchTotal";
import styles from "./SearchArtistResult.module.css";

const SearchArtistResult = async ({
  freeWord,
  url,
}: {
  freeWord: string;
  url: string;
}) => {
  const res = await getFreeArtist(freeWord);
  const searchArtist: DeezerArtist[] = res.resultData;

  return (
    <div>
      <div>
        <SearchTotal searchTotal={String(searchArtist.length)} name="アーティスト" />
      </div>
      <div className={styles.artistGroup}>
        {searchArtist.map((result: DeezerArtist) => {
          return <SearchArtistResultContent key={result.id} result={result} url={url} />;
        })}
      </div>
    </div>
  );
};

export default SearchArtistResult;
