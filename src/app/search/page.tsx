import SearchKind from "@/components/search/SearchKind/SearchKind";
import SearchResult from "@/components/search/SearchResult/SearchResult";
import SearchTotal from "@/components/search/SearchTotal/SearchTotal";
import SearchValue from "@/components/search/SearchValue/SearchValue";
import BreadList from "@/components/top/BreadList/BreadList";
import FreeSearch from "@/components/top/FreeSearch/FreeSearch";
import styles from "./page.module.css";

const Search = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  //searchParamsでクエリパラメータを取得
  const freeWord = searchParams.q;
  const searchTotal = searchParams.n;

  return (
    <div>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/search", title: "検索結果" },
        ]}
      />
      <div>
        <SearchValue freeWord={freeWord} />
      </div>

      <div className={styles.searchMargin}>
        <FreeSearch />
      </div>

      <div>
        <SearchKind />
      </div>

      <div>
        <SearchTotal searchTotal={searchTotal} />
      </div>

      <div>
        <SearchResult freeWord={freeWord} />
      </div>
    </div>
  );
};

export default Search;
