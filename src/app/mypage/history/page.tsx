import DeleteButton from "@/components/mypage/DeleteButton/DeleteButton";
import MenuHeader from "@/components/mypage/MenuHeader/MenuHeader";
import SongList from "@/components/mypage/SongList/SongList";
import BreadList from "@/components/top/BreadList/BreadList";
import { getSong } from "@/utils/apiFunc";

const PlayList = async () => {
  // FIXME: ログインユーザーidを取得する
  // FIXME: ログインユーザーの再生履歴(最大10件)をDBから取得する

  // MEMO: 表示確認のため、仮で曲idの配列を定義する
  const historySongsId = [2210493097, 824731152, 1171495792, 2449469235, 1002378782];

  const historySongsInfo = await Promise.all(
    historySongsId.map(async (songId) => {
      const songData = await getSong(songId);
      return songData.resSongData;
    }),
  );

  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/mypage", title: "マイページ" },
          { link: "/mypage/history", title: "再生履歴" },
        ]}
      />
      <MenuHeader title="再生履歴" />
      <DeleteButton />
      <SongList songs={historySongsInfo} url="music" errorMessage="履歴がありません" />
    </>
  );
};

export default PlayList;
