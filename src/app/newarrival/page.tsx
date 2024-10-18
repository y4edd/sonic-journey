import { ChartTitle } from "@/components/newChart/ChartTitle/ChartTitle";
import { Song } from "@/components/newChart/Song/Song";
import { getNewSongs } from "@/utils/apiFunc";

const Page = async () => {
  const getSongs = await getNewSongs(20);
  return (
    <>
      <ChartTitle title="新着（アルバム）" />
      <Song songs={getSongs} />
    </>
  );
};

export default Page;
