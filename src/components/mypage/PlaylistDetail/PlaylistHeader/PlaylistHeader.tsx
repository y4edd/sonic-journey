import styles from "./PlaylistHeader.module.css";

export const PlaylistHeader = ({
  playlistTitle,
}: {
  playlistTitle: string;
}) => {
  return (
    <>
      <h1 className={styles.playlistTitle}>{playlistTitle}</h1>
    </>
  );
};
