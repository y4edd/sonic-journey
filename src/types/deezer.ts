export type DeezerSongs = {
  id?: number;
  readable?: boolean;
  title?: string;
  title_short?: string;
  title_version?: string;
  link?: string;
  duration?: number;
  rank?: number;
  explicit_lyrics?: boolean;
  explicit_content_lyrics?: number;
  explicit_content_cover?: number;
  preview?: string;
  md5_image?: string;
  artist: DeezerArtist;
  album: DeezerAlbum;
  type?: string;
};

export type DeezerArtist = {
  id?: number;
  name?: string;
  link?: string;
  picture?: string;
  picture_small?: string;
  picture_medium?: string;
  picture_big?: string;
  picture_xl?: string;
  tracklist?: string;
  type?: string;
};

export type DeezerAlbum = {
  id?: number;
  title?: string;
  cover?: string;
  cover_small?: string;
  cover_medium?: string;
  cover_big?: string;
  cover_xl?: string;
  md5_image?: string;
  tracklist?: string;
  type?: string;
};

export type DeezerSearch = {
  data?: DeezerSongs[];
  total?: number;
  next?: string;
};

// deezerにて楽曲情報を取得した際の型
export type DeezerNewRelease = {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  release_date: string;
  tracklist: string;
  artist: {
    id: number;
    name: string;
    tracklist: string;
    type: string;
  };
  type: string;
};

export type DeezerNewReleaseApi = {
  data: DeezerNewRelease[];
};

export type DeezerNewSongDetail = {
  song: {
    id: number;
    title: string;
    cover_xl: string;
    release_date: string;
    artist: {
      id: number;
      name: string;
    };
  };
};

export type DeezerSong = {
  id: number;
  title: string;
  cover_xl?: string;
  release_date?: string;
  artist: {
    id: number;
    name: string;
  };
  album: {
    id: number;
    title: string;
    cover_xl?: string;
  };
};

export type DeezerChartSong = {
  artist: {
    id: number;
    name: string;
  };
  cover_xl: string;
  id: number;
  release_date: string;
  title: string;
};

// ジャンルの型
export type GenreArtist = {
  id: number;
  name: string;
};

// apiから返されるジャンルごとのアーティスト
export type GenreApiArtist = {
  id: number;
  name: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  radio: boolean;
  tracklist: string;
  type: string;
};
