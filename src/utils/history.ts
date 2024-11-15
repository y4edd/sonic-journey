// 再生履歴を保存する関数
// songIdには保存したい楽曲のIDを入力
export const savePlayHistory = async (songId: number) => {
  try {
    const res = await fetch("http://localhost:3000/api/savePlayHistory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ songId }),
    });

    if (!res.ok) {
      throw new Error("再生履歴の保存に失敗しました");
    }
  } catch (error) {
    console.error(error);
  }
};
