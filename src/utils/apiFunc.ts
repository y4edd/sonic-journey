// 人気新着楽曲を取得する関数
export const getNewSongs = async (limit: number) => {
  const res = await fetch(`http://localhost:3000/api/newSongsSearch?limit=${limit}`);
  return await res.json();
};

// シングルランキング楽曲を取得する関数
export const getRankSingleSongs = async (limit: number) => {
  const res = await fetch(`http://localhost:3000/api/rankSingleSongSearch?limit=${limit}`);
  return await res.json();
};
