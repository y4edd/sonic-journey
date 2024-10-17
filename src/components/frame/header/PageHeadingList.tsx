import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./PageHeadingList.module.css";

export const PageHeadingList = () => {
  const pathname = usePathname();
  return (
    <>
      <ul className={styles.headerBottom}>
        <li
          className={pathname === "/newarrival" ? styles.thePageHeading : styles.otherPageHeading}
        >
          <Link href="/newarrival">新着</Link>
        </li>
        <li className={pathname === "/ranking" ? styles.thePageHeading : styles.otherPageHeading}>
          <Link href="/ranking">ランキング</Link>
        </li>
        <li className={pathname === "/special" ? styles.thePageHeading : styles.otherPageHeading}>
          <Link href="/special">特集</Link>
        </li>
        <li className={pathname === "/genre" ? styles.thePageHeading : styles.otherPageHeading}>
          <Link href="/genre">ジャンル</Link>
        </li>
      </ul>
    </>
  );
};
