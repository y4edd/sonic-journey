import jwt from "jsonwebtoken";

// NOTE: トークンからユーザーIDを取得するユーティリティ関数
export const getUserIdFromToken = (token: string): string | null => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error("JWTの秘密鍵が設定されていません");
    }

    const decoded = jwt.verify(token, secretKey) as { id: string };
    return decoded.id;
  } catch (error) {
    console.error("トークンの検証に失敗しました:", error);
    return null;
  }
};
