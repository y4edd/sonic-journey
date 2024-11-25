import SearchKind from "@/components/search/SearchKind/SearchKind";
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
  const kind = searchParams.k;
  const style = searchParams.s;
  return (
    <div>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/search", title: "検索結果" },
        ]}
      />
      <div className={styles.search}>
        <div>
          <SearchValue freeWord={freeWord} />
        </div>

        <div>
          <FreeSearch />
        </div>

        <div>
          <SearchKind freeWord={freeWord} searchTotal={searchTotal} kind={kind} style={style} />
        </div>
      </div>
    </div>
  );
};

export default Search;
