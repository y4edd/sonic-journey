import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";
import Link from "next/link";
import styles from "../../unexpected.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.unexpectedPage}>
      <div className={styles.unexpectedContent}>
        <h1>
          <StarIcon sx={{ color: "#fff834" }} />
          大当たり
          <StarIcon sx={{ color: "#fff834" }} />
        </h1>
        <p>こちらのアルバム情報は存在しません。</p>
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

export default NotFoundPage;
