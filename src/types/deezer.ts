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
