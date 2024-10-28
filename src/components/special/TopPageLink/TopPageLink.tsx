import type { SpecialOverView } from "@/types/deezer";
import Image from "next/image";
import Link from "next/link";
import styles from "./TopPageLink.module.css";

export const getSpecialImage = async () => {
  const response = await fetch("http://localhost:3000/api/getSpecialImage", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("特集ページの情報の取得に失敗しました");
  }
  const images: SpecialOverView[] = await response.json();
  return images;
};

export const TopPageLink = async () => {
  const specialImages = await getSpecialImage();
  return (
    <div className={styles.imageContainer}>
      {specialImages.map((specialImage) => (
        <div className={styles.imageItem} key={specialImage.id}>
          <Link href={`/special/${specialImage.id}`}>
            <Image
              src={`/images/${specialImage.image}`}
              alt={specialImage.title}
              height={180}
              width={360}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};
