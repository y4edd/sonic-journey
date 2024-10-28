import { ChartTitle } from "@/components/newChart/ChartTitle/ChartTitle";
import { TopPageLink } from "@/components/special/TopPageLink/TopPageLink";
import BreadList from "@/components/top/BreadList/BreadList";

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
