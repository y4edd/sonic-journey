import { Special } from "@/components/special/DetailPage/Special/Special";
import BreadList from "@/components/top/BreadList/BreadList";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { getSpecialImage } from "@/components/special/TopPageLink/TopPageLink";

type SongPageProps = {
  params: { id: number };
  searchParams: ReadonlyURLSearchParams;
};

const Page = async ({ params }: SongPageProps) => {
  const { id } = params;
  const specialOverViews = await getSpecialImage();
  const specialOverView = specialOverViews[id - 1];
  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/special", title: "特集" },

          { link: `/special/${id}`, title: `${specialOverView.title}` },
        ]}
      />
      <Special id={id} />
    </>
  );
};

export default Page;
