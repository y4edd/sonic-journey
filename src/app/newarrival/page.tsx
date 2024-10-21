import { ChartTitle } from "@/components/newChart/ChartTitle/ChartTitle";
import { Song } from "@/components/newChart/Song/Song";
import BreadList from "@/components/top/BreadList/BreadList";
import { getNewSongs } from "@/utils/apiFunc";

const Page = async () => {
  const getSongs = await getNewSongs(20);
  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/newarrival", title: "新着" },
        ]}
      />
      <ChartTitle title="新着（アルバム）" />
      <Song songs={getSongs} />
    </>
  );
};

export default Page;
