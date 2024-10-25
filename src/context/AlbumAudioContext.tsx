import React, { createContext, useState, useContext, type ReactNode } from "react";

// コンテキストのデータの型
type AudioContextType = {
  currentlyPlayingId: number | null;
  setCurrentlyPlayingId: (id: number | null) => void;
};

// コンテキストオブジェクト nullはデフォルト値
const AlbumAudioContext = createContext<AudioContextType | null>(null);

// このProviderで囲んだコンポーネントの子孫コンポーネントはここのデータにアクセスできる
export const AlbumAudioProvider = ({ children }: { children: ReactNode }) => {
  // 再生中のidをuseStateで管理
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<number | null>(null);
  // Providerのvalueプロパティに共有したい値を設定する
  // childrenをProviderでラップするために、以下のような記述が必要
  return (
    <AlbumAudioContext.Provider value={{ currentlyPlayingId, setCurrentlyPlayingId }}>
      {children}
    </AlbumAudioContext.Provider>
  );
};

// カスタムフックにする
// nullの条件分をつけて、Providerの外でカスタムフックを使用したらエラーが出るようにする。
// これがないと、コンポーネントで型エラーが出てしまう。
export const useAlbumAudio = () => {
  const context = useContext(AlbumAudioContext);
  if (context === null) {
    throw new Error("useAlbumAudioはAlbumAudioプロバイダーの中で使用する必要があります");
  }
  return context;
};
