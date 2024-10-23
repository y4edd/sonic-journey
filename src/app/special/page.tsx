import { ChartTitle } from "@/components/newChart/ChartTitle/ChartTitle";
import BreadList from "@/components/top/BreadList/BreadList";
import { TopPageLink } from "@/components/special/TopPageLink/TopPageLink";

const Page = () => {
  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/special", title: "特集" },
        ]}
      />
      <ChartTitle title="特集" />
      <TopPageLink />
    </>
  );
};

export default Page;
