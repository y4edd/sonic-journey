import SearchKind from "@/components/search/SearchKind/SearchKind";
import SearchResult from "@/components/search/SearchResult/SearchResult";
import SearchTotal from "@/components/search/SearchTotal/SearchTotal";
import SearchValue from "@/components/search/SearchValue/SearchValue";
import BreadList from "@/components/top/BreadList/BreadList";
import FreeSearch from "@/components/top/FreeSearch/FreeSearch";
const Search = () => {
  return (
    <div>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/search", title: "検索結果" },
        ]}
      />
      <div>
        <SearchValue />
      </div>

      <div>
        <FreeSearch />
      </div>

      <div>
        <SearchKind />
      </div>

      <div>
        <SearchTotal />
      </div>

      <div>
        <SearchResult />
      </div>
    </div>
  );
};

export default Search;
