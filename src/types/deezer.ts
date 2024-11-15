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
  cover_xl: string;
  release_date?: string;
  preview?: string;
  duration?: string;
  artist: {
    id: number;
    name: string;
    picture_xl?: string;
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

// apiから返されるシングル情報
export type SongInfo = {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
};

// apiから返されるcontributors情報
export type ContributorsInfo = {
  id: number;
  name: string;
  link: string;
  share: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  radio: boolean;
  tracklist: string;
  type: string;
  role: string;
};

// apiから返されるアーティスト情報
export type ArtistInfo = {
  id: number;
  name: string;
  tracklist: string;
  type: string;
};

// apiから返されるアルバム情報
export type AlbumInfo = {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  tracklist: string;
  type: string;
};

// apiから返されるアーティストの人気楽曲(https://api.deezer.com/artist/:id/top)一曲
export type FavoriteArtistSong = SongInfo & {
  contributors: ContributorsInfo[];
  md5_image: string;
  artist: ArtistInfo;
  album: AlbumInfo;
  type: string;
};

// PicksDBのデータ情報
export type SpecialOverView = {
  id: number;
  title: string;
  description: string;
  image: string;
};

// PickSongDBのデータ情報
export type PrismaSpecialSongs = {
  id: number;
  pick_id: number;
  api_song_id: bigint;
};

// ↓ 変換

// PickSongのデータ
export type SpecialSongs = {
  id: number;
  pick_id: number;
  api_song_id: number;
};

// 特集ページの記載の為、トラックIDより引っ張ってきた曲情報
export type DeezerTrackSong = {
  id: number;
  title: string;
  preview: string;
  cover_xl: string;
  duration: number;
  artist: {
    id: number;
    name: string;
  };
  album: {
    id: number;
    title: string;
  };
};

//あいまい検索
export type Result = {
  id: number;
  title: string;
  preview: string;
  artist: {
    id: number;
    name: string;
    picture_big: string;
  };
  cover: string;
};

// アルバム1曲の型
export type AlbumSong = {
  id: number;
  title: string;
  duration: number;
  preview: string;
  album: {
    cover_xl: string;
  };
};

// アルバム詳細ページで表示される楽曲の型
export type AlbumSingle = {
  id: number;
  title: string;
  duration: number;
  preview: string;
  cover_xl: string;
};

// アーティストのアルバム情報を取得するapiで使用する型
export type ArtistAlbum = {
  id: number;
  title: string;
  link: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  genre_id: number;
  nb_tracks: number;
  record_type: string;
  tracklist: string;
  explicit_lyrics: boolean;
  artist: {
    id: number;
    name: string;
    link: string;
    picture: string;
    picture_small: string;
    picture_medium: string;
    picture_big: string;
    picture_xl: string;
    tracklist: string;
    type: string;
  };
  type: string;
};

//SearchAlbumで使用する型
export type SearchAlbum = {
  id: number;
  title: string;
  cover_xl: string;
  artist: {
    name: string;
  };
};

// deezerAPIから取得したgenreデータ
export type GenreInfo = {
  id: number;
  name: string;
  picture: string;
};

// プレイリストの型
export type Playlist = {
  id: number;
  name: string;
};
