// FavoriteSongテーブルを操作する関数群

// お気に入り楽曲を削除する関数
// 注意: cookieの認証があるためサーバーサイドからは呼び出せない
export const deleteFavoriteSongs = async(songIds: number[]) => {
  try{
    const res = await fetch("http://localhost:3000/api/deleteFavoriteSongs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ songIds }),
    });

    if(!res.ok) {
      throw new Error("お気に入り楽曲の削除に失敗しました")
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
}
