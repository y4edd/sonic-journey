import styles from "./SpecialHeader.module.css";
import type { SpecialOverView } from "@/types/deezer";
import Image from "next/image";

export const SpecialHeader = ({
  specialOverView,
}: {
  specialOverView: SpecialOverView;
}) => {
  return (
    <>
      <div className={styles.headerImg}>
        <Image
          src={`/images/${specialOverView.image}`}
          alt=""
          height={215}
          width={430}
        />
      </div>
    </>
  );
};
