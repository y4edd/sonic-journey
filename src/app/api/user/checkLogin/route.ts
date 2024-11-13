import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { type NextRequest, NextResponse } from "next/server";

// ログイン状態の確認（返り値はid）
export const GET = async (req: NextRequest) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json({ message: "権限がありません" }, { status: 401 });
  }

  const token = req.cookies.get("token");

  if (!token) {
    return NextResponse.json({ message: "ログインが必要です" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token.value, secretKey) as { id: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ message: "ユーザーが見つかりませんでした" }, { status: 404 });
    }
    return NextResponse.json({ id: user.id }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
