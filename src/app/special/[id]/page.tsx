import { ReadonlyURLSearchParams } from "next/navigation";
import BreadList from "@/components/top/BreadList/BreadList";
import { Special } from "@/components/special/DetailPage/Special/Special";

type SongPageProps = {
  params: { id: number };
  searchParams: ReadonlyURLSearchParams;
};

const Page = async ({ params }: SongPageProps) => {
  const { id } = params;

  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/special", title: "特集" },
        ]}
      />
      <Special id={id} />
    </>
  );
};

export default Page;
