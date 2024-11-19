import { cookies } from "next/headers";

// NOTE: サーバーサイドでCookieからtokenを取得するユーティリティ関数
export const getTokenFromCookie = () => {
  const cookieStore = cookies();
  console.log("クッキー", cookieStore);
  const token = cookieStore.get("token");
  console.log("トークン", token);
  return token ? `${token.name}=${token.value}` : "";
};
