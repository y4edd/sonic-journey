"use client"

const FavoriteButton = ({id}:{id: number}) => {
  const postFavorite = async () => {
    const response = await fetch("/api/Favorite/Songs/Post",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        music_id: id
      }),
    }
    );
    if(!response.ok) {
      const error = response.json();
      console.error(error);
      alert(error);
    }
    alert("お気に入り楽曲に追加されました");
  };

  return (
    <>
      <p onClick={postFavorite}>お気に入りに追加</p>
    </>
  );
}

export default FavoriteButton;
