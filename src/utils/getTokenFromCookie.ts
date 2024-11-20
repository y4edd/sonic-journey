import { cookies } from "next/headers";

// NOTE: サーバーサイドでCookieからtokenを取得するユーティリティ関数
export const getTokenFromCookie = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return token ? `${token.name}=${token.value}` : "";
};
