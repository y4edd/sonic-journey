// FavoriteSongテーブルを操作する関数群

// DBからお気に入り楽曲の楽曲idと更新日を取得する関数（Cookieのtokenを引数にとる）
export const getFavoriteSongs = async (token: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/favorite/songs", {
      cache: "no-cache",
      headers: {
        Cookie: token,
      },
    });

    if (!res.ok) {
      throw new Error("データが見つかりませんでした");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// お気に入り楽曲を削除する関数
// 注意: cookieの認証があるためサーバーサイドからは呼び出せない
export const deleteFavoriteSongs = async (songIds: number[]) => {
  try {
    const res = await fetch("http://localhost:3000/api/favorite/songs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ songIds }),
    });

    if (!res.ok) {
      throw new Error("お気に入り楽曲の削除に失敗しました");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
