import SearchKind from "@/components/search/SearchKind/SearchKind";
import SearchValue from "@/components/search/SearchValue/SearchValue";
import BreadList from "@/components/top/BreadList/BreadList";
import FreeSearch from "@/components/top/FreeSearch/FreeSearch";
import styles from "./page.module.css";

const Search = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const params = await searchParams;
  //searchParamsでクエリパラメータを取得
  const freeWord = params.q;
  const searchTotal = params.n;
  const kind = params.k;
  const style = params.s;
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
