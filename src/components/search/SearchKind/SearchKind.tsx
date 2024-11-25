import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import Link from "next/link";
import SearchAlbumResult from "../SearchAlbumResult/SearchAlbumResult";
import SearchArtistResult from "../SearchArtistResult/SearchArtistResult";
import SearchResult from "../SearchResult/SearchResult";
import styles from "./SearchKind.module.css";
const SearchKind = ({
  freeWord,
  searchTotal,
  kind,
  style,
}: {
  freeWord: string;
  searchTotal: string;
  kind: string;
  style: string;
}) => {
  return (
    <div className={styles.display}>
      <ul className={styles.kind}>
        {/* クリックすると項目に対応するクエリパラメータを追加 */}
        <li className={styles.kindList}>
          <Link
            href={`/search?q=${freeWord}&n=${searchTotal}&k=all&s=grid`}
            className={kind === "all" ? styles.active : ""}
          >
            全て
          </Link>
        </li>
        <li className={styles.kindList}>
          <Link
            href={`/search?q=${freeWord}&n=${searchTotal}&k=single&s=grid`}
            className={kind === "single" ? styles.active : ""}
          >
            シングル
          </Link>
        </li>
        <li className={styles.kindList}>
          <Link
            href={`/search?q=${freeWord}&n=${searchTotal}&k=album&s=grid`}
            className={kind === "album" ? styles.active : ""}
          >
            アルバム
          </Link>
        </li>
        <li className={styles.kindList}>
          <Link
            href={`/search?q=${freeWord}&n=${searchTotal}&k=artist&s=grid`}
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
          <div className={styles.icon}>
            <Link href={`/search?q=${freeWord}&n=${searchTotal}&k=all&s=grid`}>
              <ViewModuleIcon className={style === "grid" ? styles.viewIcon : styles.noneIcon} />
            </Link>

            <Link href={`/search?q=${freeWord}&n=${searchTotal}&k=all&s=none`}>
              <ViewListIcon className={style === "grid" ? styles.noneIcon : styles.viewIcon} />
            </Link>
          </div>
          {style === "grid" && (
            <div>
              <SearchResult
                freeWord={freeWord}
                url="music"
                searchTotal={searchTotal}
                style="grid"
              />
              <hr className={styles.hr} />
              <SearchAlbumResult freeWord={freeWord} url="album" style="grid" />
              <hr className={styles.hr} />
              <SearchArtistResult freeWord={freeWord} url="artist" style="grid" />
            </div>
          )}
          {style === "none" && (
            <div>
              <SearchResult
                freeWord={freeWord}
                url="music"
                searchTotal={searchTotal}
                style="none"
              />
              <hr className={styles.hr} />
              <SearchAlbumResult freeWord={freeWord} url="album" style="none" />
              <hr className={styles.hr} />
              <SearchArtistResult freeWord={freeWord} url="artist" style="none" />
            </div>
          )}
        </div>
      )}
      {kind === "single" && (
        <div>
          <div className={styles.icon}>
            <Link href={`/search?q=${freeWord}&n=${searchTotal}&k=single&s=grid`}>
              <ViewModuleIcon className={style === "grid" ? styles.viewIcon : styles.noneIcon} />
            </Link>

            <Link href={`/search?q=${freeWord}&n=${searchTotal}&k=single&s=none`}>
              <ViewListIcon className={style === "grid" ? styles.noneIcon : styles.viewIcon} />
            </Link>
          </div>

          {style === "grid" && (
            <SearchResult freeWord={freeWord} url="music" searchTotal={searchTotal} style="grid" />
          )}

          {style === "none" && (
            <SearchResult freeWord={freeWord} url="music" searchTotal={searchTotal} style="none" />
          )}
        </div>
      )}
      {kind === "album" && (
        <div>
          <div className={styles.icon}>
            <Link href={`/search?q=${freeWord}&n=${searchTotal}&k=album&s=grid`}>
              <ViewModuleIcon className={style === "grid" ? styles.viewIcon : styles.noneIcon} />
            </Link>

            <Link href={`/search?q=${freeWord}&n=${searchTotal}&k=album&s=none`}>
              <ViewListIcon className={style === "grid" ? styles.noneIcon : styles.viewIcon} />
            </Link>
          </div>
          {style === "grid" && <SearchAlbumResult freeWord={freeWord} url="album" style="grid" />}

          {style === "none" && <SearchAlbumResult freeWord={freeWord} url="album" style="none" />}
        </div>
      )}
      {kind === "artist" && (
        <div>
          <div className={styles.icon}>
            <Link href={`/search?q=${freeWord}&n=${searchTotal}&k=artist&s=grid`}>
              <ViewModuleIcon className={style === "grid" ? styles.viewIcon : styles.noneIcon} />
            </Link>

            <Link href={`/search?q=${freeWord}&n=${searchTotal}&k=artist&s=none`}>
              <ViewListIcon className={style === "grid" ? styles.noneIcon : styles.viewIcon} />
            </Link>
          </div>
          {style === "grid" && <SearchArtistResult freeWord={freeWord} url="artist" style="grid" />}

          {style === "none" && <SearchArtistResult freeWord={freeWord} url="artist" style="none" />}
        </div>
      )}
    </div>
  );
};
export default SearchKind;
