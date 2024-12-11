import UnauthorizedAccess from "@/components/UnauthorizedAccess/UnauthorizedAccess";
import MenuHeader from "@/components/mypage/MenuHeader/MenuHeader";
import { PlaylistBody } from "@/components/mypage/playlist/PlaylistBody/PlaylistBody";
import BreadList from "@/components/top/BreadList/BreadList";
import { getUserId } from "@/utils/apiFunc";
import { checkLoggedInServer } from "@/utils/apiFunc";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";

const PlayListPage = async () => {
  const token = getTokenFromCookie();
  const isLoggedin = await checkLoggedInServer(token);
  const userId = await getUserId(token);

  if (!isLoggedin) {
    return <UnauthorizedAccess />;
  }

  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/mypage", title: "マイページ" },
          { link: "/mypage/playlist", title: "プレイリスト" },
        ]}
      />
      <MenuHeader title="プレイリスト" />
      <PlaylistBody userId={userId} />
    </>
  );
};

export default PlayListPage;
