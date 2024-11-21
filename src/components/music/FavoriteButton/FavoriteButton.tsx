"use client"
type FavoriteButtonProps = {
  text:string;
}

const FavoriteButton = ({text}:FavoriteButtonProps) => {
  const postFavorite = async () => {
  };
  return (
    <>
      <p onClick={()=>postFavorite}>{text}</p>
    </>
  );
}

export default FavoriteButton;
