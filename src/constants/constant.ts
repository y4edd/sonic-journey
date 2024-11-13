// 表示させるアーティストのジャンル
export const GENRE_ARTISTS = [
  { id: 0, name: "すべて" },
  { id: 132, name: "ポップス" },
  { id: 152, name: "ロック" },
  { id: 165, name: "R&B" },
  { id: 113, name: "ダンス" },
  { id: 464, name: "メタル" },
  { id: 16, name: "アジア音楽" },
  { id: 95, name: "キッズ" },
  { id: 173, name: "映画/ゲーム" },
];

// cookieの有効期限(1日)
export const COOKIE_MAX_AGE = 60 * 60 * 24;

// FIXME: 視聴履歴表示に伴う仮の情報。今後deezerから取得したデータに変更する必要があります。
export const HISTORY = [
  {
    id: 1,
    image: "/images/defaultsong.png",
    title: "楽曲名1文字列が続きます。文字列が続きます。",
    artist: "アーティスト名文字列が続きます。文字列が続きます。",
  },
  {
    id: 2,
    image: "/images/defaultsong.png",
    title: "楽曲名2文字列が続きます。",
    artist: "アーティスト名文字列が続きます。",
  },
  {
    id: 3,
    image: "/images/defaultsong.png",
    title: "楽曲名3",
    artist: "アーティスト名",
  },
  {
    id: 4,
    image: "/images/defaultsong.png",
    title: "楽曲名4",
    artist: "アーティスト名",
  },
  {
    id: 5,
    image: "/images/defaultsong.png",
    title: "楽曲名5",
    artist: "アーティスト名",
  },
  {
    id: 6,
    image: "/images/defaultsong.png",
    title: "楽曲名6",
    artist: "アーティスト名",
  },
];
