import Link from "next/link";
import styles from "./BreadList.module.css";

type BreadProps = {
  bread: {
    link: string;
    title: string;
  }[];
};

const BreadList = ({ bread }: BreadProps) => {
  const breadList = Object.entries(bread);
  return (
    <div className={styles.breadListGroup}>
      {breadList.map((bread: [string, { link: string; title: string }]) => {
        return (
          <div key={bread[0]}>
            <Link href={bread[1].link}>
              <span className={styles.breadListTitle}>{bread[1].title}</span>
            </Link>
            {Number(bread[0]) !== breadList.length - 1 ? <span>&gt;</span> : <></>}
          </div>
        );
      })}
    </div>
  );
};

export default BreadList;
