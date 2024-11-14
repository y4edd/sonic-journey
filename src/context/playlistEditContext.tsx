import React, { createContext, useContext, type ReactNode, useState } from "react";

type PlaylistContextType = {
  playlistFlag: string | null;
  setPlaylistFlag: (flag: string | null) => void;
};
const PlaylistEditFlag = createContext<PlaylistContextType | null>(null);

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
  const [playlistFlag, setPlaylistFlag] = useState<string | null>(null);

  return (
    <PlaylistEditFlag.Provider value={{ playlistFlag, setPlaylistFlag }}>
      {children}
    </PlaylistEditFlag.Provider>
  );
};

export const usePlaylistEditContext = () => {
  const context = useContext(PlaylistEditFlag);
  return context;
};
