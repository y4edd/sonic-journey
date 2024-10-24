import Image from "next/image";
import Link from "next/link";
import styles from "../../../app/unexpected.module.css";

const EmptyContent = ({ title }: { title: string }) => {
  return (
    <div className={styles.unexpectedPage}>
      <div className={styles.unexpectedContent}>
        <h1>⭐️ 大当たり ⭐️</h1>
        <p>お探しの{title}情報は存在しません。</p>
        <p>
          このページを訪れたあなたはとても幸運です。
          <br />
          宝くじを買いに行きましょう！！
        </p>
        <Image src="/images/cat.jpg" alt="not-found画像" width={300} height={200} priority />
        <Link href="/">トップページへ戻る</Link>
      </div>
    </div>
  );
};

export default EmptyContent;
