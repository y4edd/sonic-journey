import Link from "next/link";
import SearchAlbumResult from "../SearchAlbumResult/SearchAlbumResult";
import SearchArtistResult from "../SearchArtistResult/SearchArtistResult";
import SearchResult from "../SearchResult/SearchResult";
import styles from "./SearchKind.module.css";
const SearchKind = ({
  freeWord,
  searchTotal,
  kind,
}: {
  freeWord: string;
  searchTotal: string;
  kind: string;
}) => {
  return (
    <div className={styles.display}>
      <ul className={styles.kind}>
        {/* クリックすると項目に対応するクエリパラメータを追加 */}
        <li className={styles.kindList}>
          <Link
            href={`/search?q=${freeWord}&n=${searchTotal}&k=all`}
            className={kind === "all" ? styles.active : ""}
          >
            全て
          </Link>
        </li>
        <li className={styles.kindList}>
          <Link
            href={`/search?q=${freeWord}&n=${searchTotal}&k=single`}
            className={kind === "single" ? styles.active : ""}
          >
            シングル
          </Link>
        </li>
        <li className={styles.kindList}>
          <Link
            href={`/search?q=${freeWord}&n=${searchTotal}&k=album`}
            className={kind === "album" ? styles.active : ""}
          >
            アルバム
          </Link>
        </li>
        <li className={styles.kindList}>
          <Link
            href={`/search?q=${freeWord}&n=${searchTotal}&k=artist`}
            className={kind === "artist" ? styles.active : ""}
          >
            アーティスト
          </Link>
        </li>
      </ul>
      <hr />
      {/* クエリパラメータが合うものを表示 */}
      {kind === "all" && (
        <div>
          <SearchResult freeWord={freeWord} url="music" searchTotal={searchTotal} />
          <hr className={styles.hr} />
          <SearchAlbumResult freeWord={freeWord} url="album" />
          <hr className={styles.hr} />
          <SearchArtistResult freeWord={freeWord} url="artist" />
        </div>
      )}
      {kind === "single" && (
        <SearchResult freeWord={freeWord} url="music" searchTotal={searchTotal} />
      )}
      {kind === "album" && <SearchAlbumResult freeWord={freeWord} url="album" />}
      {kind === "artist" && <SearchArtistResult freeWord={freeWord} url="artist" />}
    </div>
  );
};
export default SearchKind;
