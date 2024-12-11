export const dynamic = "force-dynamic"; // 動的レンダリングを強制する

import { ChartTitle } from "@/components/newChart/ChartTitle/ChartTitle";
import { Song } from "@/components/rankingChart/Song/Song";
import BreadList from "@/components/top/BreadList/BreadList";
import { getRankSingleSongs } from "@/utils/apiFunc";

const Page = async () => {
  const getSongs = await getRankSingleSongs(20);
  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/ranking", title: "ランキング" },
        ]}
      />
      <ChartTitle title="シングルランキング" />
      <Song songs={getSongs} />
    </>
  );
};

export default Page;
