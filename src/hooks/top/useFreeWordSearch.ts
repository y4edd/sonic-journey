import { useState } from "react";

type UseFreeWordSearch = () => {
  handleForm: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  freeWord: string;
};

// フリーワード検索のためのカスタムフック
// 使用箇所(トップページ)
export const useFreeWordSearch: UseFreeWordSearch = () => {
  // stateで検索ワードを管理
  const [freeWord, setFreeWord] = useState("");
  // apiへのリクエストが失敗した時のエラーを格納
  const [error, setError] = useState("");

  // 検索ワード入力時の関数
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFreeWord(e.target.value);
    setError("");
  };

  // 検索時の処理
  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 入力欄が未入力、空白の場合処理を止める(クライアント側のバリデーション)
    if (freeWord.trim().length === 0) {
      setError("検索ワードを入力してください。");
      return;
    }

    // apiにリクエスト
    try {
      const response = await fetch("/api/freeSearch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ freeWord }),
      });

      // 失敗した場合の処理
      if (!response.ok) {
        setError("エラーが発生しました");
        return;
      }

      const data = await response.json();
      // FIXME: 検索結果ページができていないため、consoleで取得データを確認（クライアント）
      console.log(data);
    } catch (error) {
      console.error(error);
      setError("サーバーエラーが発生しました");
    }
  };
  return {
    handleChange,
    handleForm,
    error,
    freeWord,
  };
};
