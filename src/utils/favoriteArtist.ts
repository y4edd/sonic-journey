// FavoriteArtistsテーブルを操作する関数群

// DBからお気に入りアーティストのidと更新日を取得する関数（Cookieのtokenを引数にとる）
export const getFavoriteArtists = async (token: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/favorite/artists", {
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

// お気に入りアーティストを削除する関数
// 注意: cookieの認証があるためサーバーサイドからは呼び出せない
export const deleteFavoriteArtists = async (artistIds: number[]) => {
  try {
    const res = await fetch("http://localhost:3000/api/favorite/artists", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artistIds }),
    });

    if (!res.ok) {
      throw new Error("お気に入りアーティストの削除に失敗しました");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
