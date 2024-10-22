// 人気新着楽曲を取得する関数
// limitには取得したい件数を入力
export const getNewSongs = async (limit: number) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/newSongsSearch?limit=${limit}`,
      {
        cache: "no-cache",
      }
    );

    if (!res.ok) {
      throw new Error("データが見つかりませんでした");
    }

    const result = await res.json();

    if (result.resultData.length < limit && limit === 4) {
      for (let i = 0; i < limit - result.resultData.length; i++) {
        result.resultData.push({
          id: 1,
          title: "BONBON GiRL",
          cover_xl: "/images/defaultsong.png",
          release_date: "2024-10-22",
          artist: {
            id: 1,
            name: "SARM",
          },
        });
      }
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};

// シングルランキング楽曲を取得する関数
// limitには取得したい件数を入力
export const getRankSingleSongs = async (limit: number) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/rankSingleSongSearch?limit=${limit}`,
      {
        cache: "no-cache",
      }
    );

    if (!res.ok) {
      throw new Error("データが見つかりませんでした");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// ジャンルごとのアーティスト情報を取得する関数
// genreにはgenreのid
export const getGenreArtist = async (genre: number) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/genreArtistSearch?genre=${genre}`,
      {
        cache: "no-cache",
      }
    );

    if (!res.ok) {
      throw new Error("データが見つかりませんでした");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// 楽曲のidから楽曲情報を取得する関数
// songには楽曲のidを入力
export const getSong = async (song: number) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/songSearch?song=${song}`,
      {
        cache: "no-cache",
      }
    );

    if (!res.ok) {
      throw new Error("データが見つかりませんでした");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// アーティストの人気曲を取得する関数
// artistIdにはアーティストのidを、limitには取得件数を入力
export const getArtistSongs = async (artistId: number, limit: number) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/artistFavoriteSongs?artistId=${artistId}&limit=${limit}`,
      {
        cache: "no-cache",
      }
    );

    if (!res.ok) {
      throw new Error("データが見つかりませんでした");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// アーティストidからアーティスト情報を取得する関数
// artistにはアーティストidを入力
export const getArtist = async (artist: number) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/artistSearch?artist=${artist}`,
      {
        cache: "no-cache",
      }
    );

    if (!res.ok) {
      throw new Error("データが見つかりませんでした");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
