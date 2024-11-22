import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./ArtistFavoriteButton.module.css";

const ArtistFavoriteButton = () => {
  return (
    <>
      <div className={styles.artistInfoContent}>
      <button>
        <FavoriteBorderIcon />
        お気に入りに追加
      </button>
      </div>
    </>
  )
};

export default ArtistFavoriteButton;
