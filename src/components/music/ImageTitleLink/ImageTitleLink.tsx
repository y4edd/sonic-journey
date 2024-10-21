import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import Link from "next/link";
import styles from "./ImageTitleLink.module.css";

type ImageTitleLinkProps = {
  name: string;
  image: string;
  url: string;
};

const ImageTitleLink = ({ name, image, url }: ImageTitleLinkProps) => {
  return (
    <div>
      <Link href={url} className={styles.imageTitleContent}>
        <Image src={image} alt={`${name}の画像`} width={150} height={150} priority />
        <p>{name}</p>
        <ArrowForwardIosIcon fontSize="small" color="disabled" />
      </Link>
    </div>
  );
};

export default ImageTitleLink;
