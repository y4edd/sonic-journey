import styles from "./PlaylistHeader.module.css";

export const PlaylistHeader = ({ playlistTitle }: { playlistTitle: string }) => {
  return (
    <>
      <p>{playlistTitle}</p>
    </>
  );
};
