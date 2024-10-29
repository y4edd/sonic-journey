import BreadList from "@/components/top/BreadList/BreadList";
import { ChartTitle } from "@/components/newChart/ChartTitle/ChartTitle";
import GenreState from "@/components/genre/GenreState/GenreState";

const Page = () => {
  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/genre", title: "ジャンル" },
        ]}
      />
      <ChartTitle title="ジャンル" />
      <GenreState />
    </>
  );
};

export default Page;
