import Image from "next/image";
import Link from "next/link";
import styles from "./unexpected.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.unexpectedPage}>
      <div className={styles.unexpectedContent}>
        <h1>404</h1>
        <p>お探しのページが見つかりませんでした。</p>
        <p>
          一時的にアクセスできない状況にあるか、
          <br />
          移動もしくは削除された可能性があります。
        </p>
        <Image src="/images/cat.jpg" alt="not-found画像" width={300} height={200} priority />
        <Link href="/">トップページへ戻る</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
