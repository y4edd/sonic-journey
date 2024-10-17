"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./unexpected.module.css";

const ErrorPage = () => {
  return (
    <div className={styles.unexpectedPage}>
      <div className={styles.unexpectedContent}>
        <h1>500</h1>
        <p>お探しのページは表示できませんでした。</p>
        <p>
          サーバーに発生した問題によって、
          <br />
          リクエストが処理されませんでした。
        </p>
        <Image src="/images/cat.jpg" alt="not-found画像" width={300} height={200} priority />
        <Link href="/">トップページへ戻る</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
