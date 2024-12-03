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

// ログインユーザーの試聴履歴の楽曲idを取得する関数
export const getPlayHistory = async (token: string, take: number) => {
  try {
    const res = await fetch(`http://localhost:3000/api/getPlayHistory?take=${take}`, {
      cache: "no-cache",
      headers: {
        Cookie: token,
      },
    });

    if (!res.ok) {
      throw new Error("再生履歴の取得に失敗しました");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// 再生履歴を削除する関数
export const deletePlayHistory = async (userId: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/deletePlayHistory?userId=${userId}`, {
      method: "DELETE",
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("再生履歴の削除に失敗しました");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
