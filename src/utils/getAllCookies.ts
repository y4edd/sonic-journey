import { cookies } from "next/headers";

// NOTE: サーバーサイドでCookieを取得するユーティリティ関数
export const getAllCookies = (): string => {
  const cookieStore = cookies();
  const cookie = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join(";");
  return cookie;
};
