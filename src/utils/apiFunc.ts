// 人気新着楽曲を取得する関数
export const getNewSongs = async (limit: number) => {
  try {
    const res = await fetch(`http://localhost:3000/api/newSongsSearch?limit=${limit}`);

    if (!res.ok) {
      throw new Error("データが見つかりませんでした");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// シングルランキング楽曲を取得する関数
export const getRankSingleSongs = async (limit: number) => {
  try {
    const res = await fetch(`http://localhost:3000/api/rankSingleSongSearch?limit=${limit}`);

    if (!res.ok) {
      throw new Error("データが見つかりませんでした");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
