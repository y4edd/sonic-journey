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
