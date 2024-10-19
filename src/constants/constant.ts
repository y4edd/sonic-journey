// スライダーに表示させる画像パス、今後リンクにする必要があります(topページ)
export const SLIDER_IMAGES = [
  "/images/sliderImage1.png",
  "/images/sliderImage2.png",
  "/images/sliderImage3.png",
  "/images/sliderImage4.png",
];

// 表示させるアーティストのジャンル
export const GENRE_ARTISTS = [
  { id: 0, name: "全て" },
  { id: 132, name: "ポップス" },
  { id: 152, name: "ロック" },
  { id: 165, name: "R&B" },
  { id: 113, name: "ダンス" },
  { id: 464, name: "メタル" },
  { id: 16, name: "アジア音楽" },
  { id: 95, name: "キッズ" },
  { id: 173, name: "映画/ゲーム" },
];

const options = { month: "2-digit" as const, day: "2-digit" as const };
const getMondayOfThisWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today.setDate(today.getDate() + diff));
  return monday;
};
export const GETMONDAYOFTHISWEEK = getMondayOfThisWeek().toLocaleDateString(
  undefined,
  options
);

const getMondayOfLastWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today.setDate(today.getDate() + diff));
  return monday;
};
export const GETMONDAYOFLASTWEEK = getMondayOfLastWeek().toLocaleDateString(
  undefined,
  options
);
